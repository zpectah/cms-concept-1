<?php

namespace model;

use PDO;

class Pages extends Model {

  static array $tableFields = ['type', 'name', 'active', 'deleted'];
  static array $tableLocaleFields = ['title', 'description', 'content'];

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
      'title' => $row['title'] ?? '',
      'description' => $row['description'] ?? '',
      'content' => $row['content'] ?? '',
    ];
  }


  public function getList(): array {
    $conn = self::connection();

    $deleted_status = 0;

    $stmt = $conn -> prepare("SELECT * FROM `pages` WHERE `deleted` = :status");
    $stmt -> bindParam(':status', $deleted_status, PDO::PARAM_INT);
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

    $stmt = $conn -> prepare("SELECT * FROM `pages` WHERE `id` = :id LIMIT 1");
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
      $tableName = 'pages_' . $locale;

      $localeStmt = $conn -> prepare("SELECT title, description, content FROM `{$tableName}` WHERE `id` = :id LIMIT 1");
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

    $sql = "INSERT INTO `pages` ($columns) VALUES ($values)";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
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
          $tableName = 'pages_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);

          $sqlLocale = "INSERT INTO `{$tableName}` ({$localeColumns}) VALUES ({$localeValues})";

          $stmtLocale = $conn -> prepare($sqlLocale);

          $stmtLocale -> bindParam(':title', $localeData['title']);
          $stmtLocale -> bindParam(':description', $localeData['description']);
          $stmtLocale -> bindParam(':content', $localeData['content']);
          $stmtLocale -> bindParam(':id', $insertId, PDO::PARAM_INT);

          $stmtLocale -> execute();
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

    $sql = "UPDATE `pages` SET " . implode(', ', $setParts) . " WHERE `id` = :id";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);

    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);

    $stmt -> execute();

    $rows = $stmt -> rowCount();

    $id = $data['id'];

    if (isset($data['locale']) && is_array($data['locale'])) {

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $tableName = 'pages_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);
          $localeSetParts = self::getQueryParts($localeData, self::$tableLocaleFields);

          $sqlLocale = "UPDATE `{$tableName}` SET " . implode(', ', $localeSetParts) . " WHERE `id` = :id";

          $stmtLocale = $conn -> prepare($sqlLocale);

          $stmtLocale -> bindParam(':title', $localeData['title']);
          $stmtLocale -> bindParam(':description', $localeData['description']);
          $stmtLocale -> bindParam(':content', $localeData['content']);
          $stmtLocale -> bindParam(':id', $id, PDO::PARAM_INT);

          $stmtLocale -> execute();

          $rows = $rows + $stmtLocale -> rowCount();
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

    $sql = "UPDATE `pages` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";

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

    $sql = "UPDATE `pages` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";

    $stmt = $conn -> prepare($sql);

    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function deletePermanently($data): array {
    /* TODO */

    return [];
  }

}
