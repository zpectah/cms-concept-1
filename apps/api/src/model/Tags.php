<?php

namespace model;

use PDO;

class Tags extends Model {

  public function getList(): array {
    $conn = self::connection();

    $deleted_status = 0;

    $stmt = $conn -> prepare("SELECT * FROM `tags` WHERE `deleted` = :status");

    $stmt -> bindParam(':status', $deleted_status, PDO::PARAM_INT);

    $stmt -> execute();

    return $stmt -> fetchAll(PDO::FETCH_ASSOC);
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

    $stmt = $conn -> prepare("SELECT * FROM `tags` WHERE `id` = :id LIMIT 1");

    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);

    $stmt -> execute();

    return $stmt -> fetch(PDO::FETCH_ASSOC);
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

    $sql = "INSERT INTO `tags` (`type`, `color`, `name`, `active`, `deleted`) VALUES (:type, :color, :name, :active, :deleted)";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':color', $data['color']);
    $stmt -> bindParam(':name', $data['name']);
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

    $setParts = [];
    $allowedFields = ['type', 'color', 'name', 'active', 'deleted'];

    foreach ($allowedFields as $field) {
      if (isset($data[$field])) {
        $setParts[] = "`$field` = :$field";
      }
    }

    if (empty($setParts)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data to update'
      ];
    }

    $sql = "UPDATE `tags` SET " . implode(', ', $setParts) . " WHERE `id` = :id";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':color', $data['color']);
    $stmt -> bindParam(':name', $data['name']);
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

    $placeholders = implode(', ', array_fill(0, count($data), '?'));

    $sql = "UPDATE `tags` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";

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

    $placeholders = implode(', ', array_fill(0, count($data), '?'));

    $sql = "UPDATE `tags` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";

    $stmt = $conn -> prepare($sql);

    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
