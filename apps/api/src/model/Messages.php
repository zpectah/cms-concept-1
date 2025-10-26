<?php

namespace model;

use PDO;

class Messages extends Model {

  private function dbToJsonDetailMapper($data): array {
    return [
      ...$data,
      'read' => $data['read'] === 1,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];
  }

  private function jsonToDbDetailMapper($data): array {
    return [
      ...$data,
      'read' => $data['read'] ? 1 : 0,
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];
  }

  public function getList(): array {
    $conn = self::connection();

    $deleted_status = 0;

    $stmt = $conn -> prepare("SELECT * FROM `messages` WHERE `deleted` = :status");
    $stmt -> bindParam(':status', $deleted_status, PDO::PARAM_INT);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
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

    $stmt = $conn -> prepare("SELECT * FROM `messages` WHERE `id` = :id LIMIT 1");
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::dbToJsonDetailMapper($detail);
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

    $fields = ['type', 'name', 'sender', 'subject', 'content', 'read', 'active', 'deleted'];

    $data = self::jsonToDbDetailMapper($data);
    $params = self::getColumnsAndValuesForQuery($fields);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `messages` ($columns) VALUES ($values)";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':sender', $data['sender']);
    $stmt -> bindParam(':subject', $data['subject']);
    $stmt -> bindParam(':content', $data['content']);
    $stmt -> bindParam(':read', $data['read'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);

    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
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

    $fields = ['read', 'active', 'deleted'];

    $data = self::jsonToDbDetailMapper($data);
    $setParts = self::getQueryParts($data, $fields);

    $sql = "UPDATE `messages` SET " . implode(', ', $setParts) . " WHERE `id` = :id";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':read', $data['read'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);

    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);

    $stmt -> execute();

    return [
      'rows' => $stmt -> rowCount(),
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

    $sql = "UPDATE `messages` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";

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

    $sql = "UPDATE `messages` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";

    $stmt = $conn -> prepare($sql);

    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function read($data): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    $placeholders = self::getUpdatePlaceholders($data);

    $sql = "UPDATE `messages` SET `read` = 1 WHERE `id` IN ({$placeholders})";

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
