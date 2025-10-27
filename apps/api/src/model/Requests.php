<?php

namespace model;

use PDO;

class Requests extends Model {

  static array $tableFields = ['type', 'token', 'applicant', 'status'];

  private function dbToJsonDetailMapper($data): array {
    $item = [
      ...$data,
    ];

    return $item;
  }

  private function jsonToDbDetailMapper($data): array {
    $item = [
      ...$data,
    ];

    return $item;
  }


  public function getList(): array {
    $conn = self::connection();

    $status = 1; // TODO

    $stmt = $conn -> prepare("SELECT * FROM `requests` WHERE `status` >= :status");
    $stmt -> bindParam(':status', $status, PDO::PARAM_INT);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::dbToJsonDetailMapper($item);
    }

    return $items;
  }

  public function getDetail($id, $token): array {
    $conn = self::connection();

    if (!$id && !$token) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No ID or TOKEN provided'
      ];
    }

    if ($id) {
      $sql = "SELECT * FROM `requests` WHERE `id` = :id LIMIT 1";
    } else if ($token) {
      $sql = "SELECT * FROM `requests` WHERE `token` = :token LIMIT 1";
    }
    $stmt = $conn -> prepare($sql);
    if ($id) {
      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    } else if ($token) {
      $stmt -> bindParam(':token', $token);
    }
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

    $data = self::jsonToDbDetailMapper($data);
    $params = self::getColumnsAndValuesForQuery(self::$tableFields);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `requests` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':token', $data['token']);
    $stmt -> bindParam(':applicant', $data['applicant']);
    $stmt -> bindParam(':status', $data['status'], PDO::PARAM_INT);
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

    $data = self::jsonToDbDetailMapper($data);
    $setParts = self::getQueryParts($data, self::$tableFields);

    $sql = "UPDATE `requests` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':token', $data['token']);
    $stmt -> bindParam(':applicant', $data['applicant']);
    $stmt -> bindParam(':status', $data['status'], PDO::PARAM_INT);
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

    $sql = "UPDATE `tags` SET `status` = 2 WHERE `id` IN ({$placeholders})";

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

    $sql = "UPDATE `tags` SET `status` = 0 WHERE `id` IN ({$placeholders})";

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
