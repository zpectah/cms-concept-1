<?php

namespace model;

use PDO;

class Members extends Model {

  static array $tableFields = ['type', 'name', 'email', 'first_name', 'last_name',
    'address_street', 'address_street_no', 'address_district', 'address_city', 'address_country', 'address_zip',
    'flat_no', 'description', 'active', 'deleted'];

  private function dbToJsonDetailMapper($data): array {
    $item = [
      ...$data,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if (isset($data['address_street']) && isset($data['address_street_no'])) {
      $item = [
        ...$item,
        'address' => [
          'street' => $data['address_street'],
          'street_no' => $data['address_street_no'],
          'district' => $data['address_district'],
          'city' => $data['address_city'],
          'country' => $data['address_country'],
          'zip' => $data['address_zip'],
        ],
      ];
    }

    return $item;
  }

  private function jsonToDbDetailMapper($data): array {
    $item = [
      ...$data,
      'address_street' => isset($data['address']['street']) ? $data['address']['street'] : '',
      'address_street_no' => isset($data['address']['street_no']) ? $data['address']['street_no'] : '',
      'address_district' => isset($data['address']['district']) ? $data['address']['district'] : '',
      'address_city' => isset($data['address']['city']) ? $data['address']['city'] : '',
      'address_country' => isset($data['address']['country']) ? $data['address']['country'] : '',
      'address_zip' => isset($data['address']['zip']) ? $data['address']['zip'] : '',
      'flat_no' => $data['flat_no'] ?? '',
      'description' => $data['description'] ?? '',
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];

    unset($item['address']);

    return $item;
  }


  public function getList(): array {
    $conn = self::connection();

    $deleted = 0;

    $sql = "SELECT id, type, name, email, first_name, last_name, active, deleted, created, updated FROM `members` WHERE `deleted` = :status";
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
      $sql = "SELECT id, type, name, email, first_name, last_name, address_street, address_street_no, address_district, address_city, address_country, address_zip, flat_no, description, active, deleted, created, updated FROM `members` WHERE `id` = :id LIMIT 1";
    } else if ($email) {
      $sql = "SELECT id, type, name, email, first_name, last_name, address_street, address_street_no, address_district, address_city, address_country, address_zip, flat_no, description, active, deleted, created, updated FROM `members` WHERE `email` = :email LIMIT 1";
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
    if (isset($data['password'])) $password = password_hash($data['password'], PASSWORD_ARGON2ID);

    if (isset($data['password'])) {
      $fields = [ ...self::$tableFields, 'password' ];
    } else {
      $fields = self::$tableFields;
    }

    $params = self::getColumnsAndValuesForQuery($fields);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `members` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    if (isset($data['password'])) $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':address_street', $data['address_street']);
    $stmt -> bindParam(':address_street_no', $data['address_street_no']);
    $stmt -> bindParam(':address_district', $data['address_district']);
    $stmt -> bindParam(':address_city', $data['address_city']);
    $stmt -> bindParam(':address_country', $data['address_country']);
    $stmt -> bindParam(':address_zip', $data['address_zip']);
    $stmt -> bindParam(':flat_no', $data['flat_no']);
    $stmt -> bindParam(':description', $data['description']);
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

    $data = self::jsonToDbDetailMapper($data);
    if (isset($data['password'])) $password = password_hash($data['password'], PASSWORD_ARGON2ID);

    if (isset($data['password'])) {
      $fields = [ ...self::$tableFields, 'password' ];
    } else {
      $fields = self::$tableFields;
    }

    $setParts = self::getQueryParts($data, $fields);

    $sql = "UPDATE `members` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    if (isset($data['password'])) $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':address_street', $data['address_street']);
    $stmt -> bindParam(':address_street_no', $data['address_street_no']);
    $stmt -> bindParam(':address_district', $data['address_district']);
    $stmt -> bindParam(':address_city', $data['address_city']);
    $stmt -> bindParam(':address_country', $data['address_country']);
    $stmt -> bindParam(':address_zip', $data['address_zip']);
    $stmt -> bindParam(':flat_no', $data['flat_no']);
    $stmt -> bindParam(':description', $data['description']);
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

    $sql = "UPDATE `members` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
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

    $sql = "UPDATE `members` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function analyzeToDelete(): array {
    $conn = self::connection();

    $deleted = 1;

    $sql = "SELECT id FROM `members` WHERE `deleted` = :status";
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

  public function deletePermanently($data): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    $placeholders = str_repeat('?,', count($data) - 1) . '?';

    $sql = "DELETE FROM `members` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
