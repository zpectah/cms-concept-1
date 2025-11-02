<?php

namespace model;

use PDO;

class Articles extends Model {

  static array $tableFields = ['type', 'name', 'categories', 'tags', 'attachments',
    'event_address_street', 'event_address_street_no', 'event_address_district',
    'event_address_city', 'event_address_country', 'event_address_zip', 'event_location',
    'event_start', 'event_end', 'active', 'deleted'];
  static array $tableLocaleFields = ['title', 'description', 'content'];

  private function dbToJsonDetailMapper($data, $localeData = false): array {
    $item = [
      ...$data,
      'categories' => $data['categories'] ? explode(',', $data['categories']) : [],
      'tags' => $data['tags'] ? explode(',', $data['tags']) : [],
      'attachments' => $data['attachments'] ? explode(',', $data['attachments']) : [],
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if (isset($data['event_address_street'])) {
      $item = [
        ...$item,
        'event_address' => [
          'street' => $data['event_address_street'] ?? '',
          'street_no' => $data['event_address_street_no'] ?? '',
          'district' => $data['event_address_district'] ?? '',
          'city' => $data['event_address_city'] ?? '',
          'country' => $data['event_address_country'] ?? '',
          'zip' => $data['event_address_zip'] ?? '',
        ],
        'event_location' => $data['event_location'] ? explode(',', $data['event_location']) : [0,0],
        'event_start' => $data['event_start'] ?? '',
        'event_end' => $data['event_end'] ?? '',
      ];
    }

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
      'categories' => implode(',', $data['categories']),
      'tags' => implode(',', $data['tags']),
      'attachments' => implode(',', $data['attachments']),
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
      'event_address_street' => $data['event_address']['street'] ?? '',
      'event_address_street_no' => $data['event_address']['street_no'] ?? '',
      'event_address_district' => $data['event_address']['district'] ?? '',
      'event_address_city' => $data['event_address']['city'] ?? '',
      'event_address_country' => $data['event_address']['country'] ?? '',
      'event_address_zip' => $data['event_address']['zip'] ?? '',
      'event_location' => implode(',', $data['event_location']),
      'event_start' => $data['event_start'] ?? '',
      'event_end' => $data['event_end'] ?? '',
    ];

    unset($item['event_address']);

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

    $deleted = 0;

    $sql = "SELECT id, name, type, categories, tags, attachments, active, deleted, created, updated FROM `articles` WHERE `deleted` = :status";
    $stmt = $conn -> prepare($sql);
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

    $sql = "SELECT * FROM `articles` WHERE `id` = :id LIMIT 1";
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
      $tableName = 'articles_' . $locale;

      $localeSql = "SELECT title, description, content FROM `{$tableName}` WHERE `id` = :id LIMIT 1";
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

    $sql = "INSERT INTO `articles` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':categories', $data['categories']);
    $stmt -> bindParam(':tags', $data['tags']);
    $stmt -> bindParam(':attachments', $data['attachments']);
    $stmt -> bindParam(':event_address_street', $data['event_address_street']);
    $stmt -> bindParam(':event_address_street_no', $data['event_address_street_no']);
    $stmt -> bindParam(':event_address_district', $data['event_address_district']);
    $stmt -> bindParam(':event_address_city', $data['event_address_city']);
    $stmt -> bindParam(':event_address_country', $data['event_address_country']);
    $stmt -> bindParam(':event_address_zip', $data['event_address_zip']);
    $stmt -> bindParam(':event_location', $data['event_location']);
    $stmt -> bindParam(':event_start', $data['event_start']);
    $stmt -> bindParam(':event_end', $data['event_end']);
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
          $tableName = 'articles_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);

          $localeSql = "INSERT INTO `{$tableName}` ({$localeColumns}) VALUES ({$localeValues})";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':title', $localeData['title']);
          $localeStmt -> bindParam(':description', $localeData['description']);
          $localeStmt -> bindParam(':content', $localeData['content']);
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

    $sql = "UPDATE `articles` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':categories', $data['categories']);
    $stmt -> bindParam(':tags', $data['tags']);
    $stmt -> bindParam(':attachments', $data['attachments']);
    $stmt -> bindParam(':event_address_street', $data['event_address_street']);
    $stmt -> bindParam(':event_address_street_no', $data['event_address_street_no']);
    $stmt -> bindParam(':event_address_district', $data['event_address_district']);
    $stmt -> bindParam(':event_address_city', $data['event_address_city']);
    $stmt -> bindParam(':event_address_country', $data['event_address_country']);
    $stmt -> bindParam(':event_address_zip', $data['event_address_zip']);
    $stmt -> bindParam(':event_location', $data['event_location']);
    $stmt -> bindParam(':event_start', $data['event_start']);
    $stmt -> bindParam(':event_end', $data['event_end']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    $rows = $stmt -> rowCount();

    $id = $data['id'];

    if (isset($data['locale']) && is_array($data['locale'])) {

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $tableName = 'articles_' . $locale;

          $localeData = self::parseLocaleData($data['locale'][$locale]);
          $localeSetParts = self::getQueryParts($localeData, self::$tableLocaleFields);

          $localeSql = "UPDATE `{$tableName}` SET " . implode(', ', $localeSetParts) . " WHERE `id` = :id";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':title', $localeData['title']);
          $localeStmt -> bindParam(':description', $localeData['description']);
          $localeStmt -> bindParam(':content', $localeData['content']);
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

    $sql = "UPDATE `articles` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
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

    $sql = "UPDATE `articles` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function analyzeToDelete(): array {
    $conn = self::connection();

    $deleted = 1;

    $sql = "SELECT id FROM `articles` WHERE `deleted` = :status";
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

    $sql = "DELETE FROM `articles` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    $rows = $stmt -> rowCount();

    foreach ($locales as $locale) {
      $tableName = 'articles_' . $locale;

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
