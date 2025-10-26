<?php

namespace model;

use PDO;

class Users extends Model {

  static array $tableFields = ['type', 'name', 'email', 'first_name', 'last_name', 'access_rights', 'active', 'deleted'];

  private function dbToJsonDetailMapper($data): array {
    $item = [
      ...$data,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

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


  public function getList(): array {
    $conn = self::connection();

    $deleted_status = 0;

    $stmt = $conn -> prepare("SELECT id, type, name, email, first_name, last_name, access_rights, active, deleted, created, updated FROM `users` WHERE `deleted` = :status");
    $stmt -> bindParam(':status', $deleted_status, PDO::PARAM_INT);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::dbToJsonDetailMapper($item);
    }

    return $items;
  }

  public function getDetail($id, $email): array {
    $conn = self::connection();

    if (!$id && !$email) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No ID or EMAIL provided'
      ];
    }

    if ($id) {
      $sql = "SELECT id, type, name, email, first_name, last_name, access_rights, active, deleted, created, updated FROM `users` WHERE `id` = :id LIMIT 1";
    } else if ($email) {
      $sql = "SELECT id, type, name, email, first_name, last_name, access_rights, active, deleted, created, updated FROM `users` WHERE `email` = :email LIMIT 1";
    }

    $stmt = $conn -> prepare($sql);

    if ($id) {
      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    } else if ($email) {
      $stmt -> bindParam(':email', $email);
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

    $params = self::getColumnsAndValuesForQuery([ ...self::$tableFields, 'password' ]);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `users` ($columns) VALUES ($values)";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':password', $data['password']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':access_rights', $data['access_rights']);
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

    if (isset($data['password'])) {
      $fields = [ ...self::$tableFields, 'password' ];
    } else {
      $fields = self::$tableFields;
    }

    $data = self::jsonToDbDetailMapper($data);
    $setParts = self::getQueryParts($data, $fields);

    $sql = "UPDATE `users` SET " . implode(', ', $setParts) . " WHERE `id` = :id";

    $stmt = $conn -> prepare($sql);

    if (isset($data['password'])) {
      $stmt -> bindParam(':password', $data['password']);
    }

    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':access_rights', $data['access_rights']);
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

    $sql = "UPDATE `users` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";

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

    $sql = "UPDATE `users` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";

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
