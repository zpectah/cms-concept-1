<?php

namespace model;

use PDO;

class MenuItems extends Model {

  static array $tableFields = ['type', 'name', 'parent_id', 'menu_id', 'link_page', 'link_url', 'item_order', 'active', 'deleted'];
  static array $tableLocaleFields = ['label'];

  private function dbToJsonDetailMapper($data, $localeData = false): array {
    $item = [
      ...$data,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if ($localeData) {
      $item = [
        ...$item,
        'locale' => $localeData,
      ];
    }

    return $item;
  }

  private function jsonToDbDetailMapper($data): array {
    $item = [
      ...$data,
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];

    return $item;
  }

  private function parseLocaleData($row): array {
    return [
      'label' => $row['label'] ?? '',
    ];
  }


  public function getList($menuId): array {
    $conn = self::connection();

    $deleted = 0;

    if ($menuId) {
      $sql = "SELECT * FROM `menuitems` WHERE `deleted` = :status AND `menu_id` = :menuid";
    } else {
      $sql = "SELECT * FROM `menuitems` WHERE `deleted` = :status";
    }
    $stmt = $conn -> prepare($sql);
    if ($menuId) $stmt -> bindParam(':menuid', $menuId, PDO::PARAM_INT);
    $stmt -> bindParam(':status', $deleted, PDO::PARAM_INT);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::dbToJsonDetailMapper($item);
    }

    return $items;
  }

  public function getDetail($id, $locales): array {
    $conn = self::connection();

    if (!$id) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No ID provided'
      ];
    }

    $sql = "SELECT * FROM `menuitems` WHERE `id` = :id LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    if (!$detail) {
      return [
        'error' => true,
        'message' => 'Detail not found'
      ];
    }

    $localeData = [];

    foreach ($locales as $locale) {
      $tableName = 'menuitems_' . $locale;

      $localeSql = "SELECT `label` FROM `{$tableName}` WHERE `id` = :id LIMIT 1";
      $localeStmt = $conn -> prepare($localeSql);
      $localeStmt -> bindParam(':id', $id, PDO::PARAM_INT);
      $localeStmt -> execute();

      $localeRow = $localeStmt -> fetch(PDO::FETCH_ASSOC);

      $localeData[$locale] = self::parseLocaleData($localeRow);
    }

    return self::dbToJsonDetailMapper($detail, $localeData);
  }

  public function create($data, $locales): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $data = self::jsonToDbDetailMapper($data);
    $params = self::getColumnsAndValuesForQuery(self::$tableFields);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `menuitems` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':parent_id', $data['parent_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':menu_id', $data['menu_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':link_page', $data['link_page'], PDO::PARAM_INT);
    $stmt -> bindParam(':link_url', $data['link_url']);
    $stmt -> bindParam(':item_order', $data['item_order'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    $insertId = $conn -> lastInsertId();

    if (isset($data['locale']) && is_array($data['locale'])) {

      $localeParams = self::getColumnsAndValuesForQuery([ ...self::$tableLocaleFields, 'id' ]);
      $localeColumns = $localeParams['columns'];
      $localeValues = $localeParams['values'];

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $tableName = 'menuitems_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);

          $localeSql = "INSERT INTO `{$tableName}` ({$localeColumns}) VALUES ({$localeValues})";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':label', $localeData['label']);
          $localeStmt -> bindParam(':id', $insertId, PDO::PARAM_INT);
          $localeStmt -> execute();
        }
      }
    }

    return [
      'id' => $insertId,
      'locales' => $locales,
    ];
  }

  public function patch($data, $locales): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    if (!isset($data['id'])) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'Missing ID for update'
      ];
    }

    $data = self::jsonToDbDetailMapper($data);
    $setParts = self::getQueryParts($data, self::$tableFields);

    $sql = "UPDATE `menuitems` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':parent_id', $data['parent_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':menu_id', $data['menu_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':link_page', $data['link_page'], PDO::PARAM_INT);
    $stmt -> bindParam(':link_url', $data['link_url']);
    $stmt -> bindParam(':item_order', $data['item_order'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    $rows = $stmt -> rowCount();

    $id = $data['id'];

    if (isset($data['locale']) && is_array($data['locale'])) {

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $tableName = 'menuitems_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);
          $localeSetParts = self::getQueryParts($localeData, self::$tableLocaleFields);

          $localeSql = "UPDATE `{$tableName}` SET " . implode(', ', $localeSetParts) . " WHERE `id` = :id";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':label', $localeData['label']);
          $localeStmt -> bindParam(':id', $id, PDO::PARAM_INT);
          $localeStmt -> execute();

          $rows = $rows + $localeStmt -> rowCount();
        }
      }
    }

    return [
      'rows' => $rows,
      'locales' => $locales,
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    $placeholders = self::getUpdatePlaceholders($data);

    $sql = "UPDATE `menuitems` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    $placeholders = self::getUpdatePlaceholders($data);

    $sql = "UPDATE `menuitems` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function analyzeToDelete(): array {
    $conn = self::connection();

    $deleted = 1;

    $sql = "SELECT id FROM `menuitems` WHERE `deleted` = :status";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':status', $deleted, PDO::PARAM_INT);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = $item['id'];
    }

    return $items;
  }

  public function deletePermanently($data, $locales): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    $placeholders = str_repeat('?,', count($data) - 1) . '?';

    $sql = "DELETE FROM `menuitems` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    $rows = $stmt -> rowCount();

    foreach ($locales as $locale) {
      $tableName = 'menuitems_' . $locale;

      $localeSql = "DELETE FROM `{$tableName}` WHERE id IN ($placeholders)";
      $localeStmt = $conn -> prepare($localeSql);
      $localeStmt -> execute($data);

      $rows =  $rows + $localeStmt -> rowCount();
    }

    return [
      'rows' => $rows,
    ];
  }

}
