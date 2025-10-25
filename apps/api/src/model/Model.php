<?php

namespace model;

use PDO;

class Model {

  public function __construct() {}

  public function getNow(): string {
    return date('c'); // ISO 8601 format
  }

  public function getColumnsAndValuesForQuery($fields): array {
    $placeholders = array_map(function($field) { return ':' . $field; }, $fields);

    return [
      'columns' => '`' . implode('`, `', $fields) . '`',
      'values' => implode(', ', $placeholders),
    ];
  }

  public function getQueryParts($data, $fields): array {
    $setParts = [];

    foreach ($fields as $field) {
      if (isset($data[$field])) {
        $setParts[] = "`$field` = :$field";
      }
    }

    if (empty($setParts)) {
      die();
    }

    return $setParts;
  }

  public function getUpdatePlaceholders($data): string {
    return implode(', ', array_fill(0, count($data), '?'));
  }

  public function connection(): PDO {
    // TODO
    $host = '127.0.0.1';
    $db   = 'cms_concept_1';
    $user = 'root';
    $pass = 'root';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $conn = null;

    $options = [
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
      $conn = new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
      throw new \PDOException($e -> getMessage(), (int)$e -> getCode());
    }

    return $conn;
  }

  // TODO: common methods across model

}
