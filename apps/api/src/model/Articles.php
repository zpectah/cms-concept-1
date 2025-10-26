<?php

namespace model;

use PDO;

class Articles extends Model {

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


  public function getList(): array {
    $conn = self::connection();

    $deleted_status = 0;

    $stmt = $conn -> prepare("SELECT id, name, type, categories, tags, attachments, active, deleted, created, updated FROM `articles` WHERE `deleted` = :status");

    $stmt -> bindParam(':status', $deleted_status, PDO::PARAM_INT);

    $stmt -> execute();

    $rawItems = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($rawItems as $item) {
      $items[] = self::dbToJsonDetailMapper($item);
    }

    return $items;
  }

  public function getDetail($id): array {
    $conn = self::connection();

    if (!$id) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No ID provided'
      ];
    }

    $stmt = $conn -> prepare("SELECT * FROM `articles` WHERE `id` = :id LIMIT 1");

    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);

    $stmt -> execute();

    $rawItem = $stmt -> fetch(PDO::FETCH_ASSOC);

    if (!$rawItem) {
      return [
        'error' => true,
        'message' => 'Article not found'
      ];
    }

    $locales = ['en', 'cs']; // TODO
    $localeData = [];

    foreach ($locales as $locale) {
      $tableName = 'articles_' . $locale;

      $localeStmt = $conn -> prepare("SELECT title, description, content FROM `{$tableName}` WHERE `id` = :id LIMIT 1");

      $localeStmt -> bindParam(':id', $id, PDO::PARAM_INT);
      $localeStmt -> execute();
      $localeRow = $localeStmt -> fetch(PDO::FETCH_ASSOC);

      $localeData[$locale] = $localeRow ?: [
        'title' => '',
        'description' => '',
        'content' => '',
      ];
    }

    return self::dbToJsonDetailMapper($rawItem, $localeData);
  }

  public function create($data): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $data = self::jsonToDbDetailMapper($data);

    $fields = ['type', 'name', 'categories', 'tags', 'attachments', 'event_address_street', 'event_address_street_no', 'event_address_district', 'event_address_city', 'event_address_country', 'event_address_zip', 'event_location', 'event_start', 'event_end', 'active', 'deleted'];

    $params = self::getColumnsAndValuesForQuery($fields);
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

    $locales = ['en', 'cs']; // TODO

    if (isset($data['locale']) && is_array($data['locale'])) {

      $localeFields = ['id', 'title', 'description', 'content'];

      $localeParams = self::getColumnsAndValuesForQuery($localeFields);
      $localeColumns = $localeParams['columns'];
      $localeValues = $localeParams['values'];

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {

          $localeData = $data['locale'][$locale];
          $tableName = 'articles_' . $locale;

          $sqlLocale = "INSERT INTO `{$tableName}` ({$localeColumns}) VALUES ({$localeValues})";
          $stmtLocale = $conn -> prepare($sqlLocale);

          $stmtLocale -> bindParam(':id', $insertId, PDO::PARAM_INT);

          $title = $localeData['title'] ?? '';
          $description = $localeData['description'] ?? '';
          $content = $localeData['content'] ?? '';

          $stmtLocale -> bindParam(':title', $title);
          $stmtLocale -> bindParam(':description', $description);
          $stmtLocale -> bindParam(':content', $content);

          $stmtLocale -> execute();
        }
      }
    }

    return [
      'id' => $insertId,
      'locales' => $locales,
    ];
  }

  public function patch($data): array {
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

    $fields = ['type', 'name', 'categories', 'tags', 'attachments', 'event_address_street', 'event_address_street_no', 'event_address_district', 'event_address_city', 'event_address_country', 'event_address_zip', 'event_location', 'event_start', 'event_end', 'active', 'deleted'];

    $setParts = self::getQueryParts($data, $fields);

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

    $locales = ['en', 'cs']; // TODO
    $localeFields = ['title', 'description', 'content'];

    if (isset($data['locale']) && is_array($data['locale'])) {

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {

          $localeData = $data['locale'][$locale];
          $tableName = 'articles_' . $locale;

          $localeSetParts = self::getQueryParts($localeData, $localeFields);

          $sqlLocale = "UPDATE `{$tableName}` SET " . implode(', ', $localeSetParts) . " WHERE `id` = :id";

          $stmtLocale = $conn -> prepare($sqlLocale);

          $title = $localeData['title'] ?? '';
          $description = $localeData['description'] ?? '';
          $content = $localeData['content'] ?? '';

          $stmtLocale -> bindParam(':title', $title);
          $stmtLocale -> bindParam(':description', $description);
          $stmtLocale -> bindParam(':content', $content);

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

}
