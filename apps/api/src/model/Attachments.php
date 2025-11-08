<?php

namespace model;

use PDO;

class Attachments extends Model {

  static array $tableFields = ['type', 'name', 'file_name', 'file_type', 'file_ext', 'file_size', 'active', 'deleted'];

  private function dbToJsonDetailMapper($data): array {
    $item = [
      ...$data,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    return $item;
  }

  private function jsonToDbDetailMapper($data): array {
    $item = [];

    if (isset($data['uid'])) {
      $item = [
        ...$item,
        'type' => $data['type'],
        'name' => $data['uid'],
        'file_name' => $data['name'] . '.' . $data['extension'],
        'file_type' => $data['mime'],
        'file_ext' => $data['extension'],
        'file_size' => $data['size'],
        'active' => isset($data['active']) ? $data['active'] ? 1 : 0 : 1,
        'deleted' => isset($data['deleted']) ? $data['active'] ? 1 : 0 : 0,
      ];
    } else {
      $item = [
        ...$item,
        'active' => $data['active'] ? 1 : 0,
        'deleted' => $data['deleted'] ? 1 : 0,
      ];
    }

    return $item;
  }


  public function getList(): array {
    $conn = self::connection();

    $deleted = 0;

    $sql = "SELECT * FROM `attachments` WHERE `deleted` = :status";
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

  public function getDetail($id, $name): array {
    $conn = self::connection();

    if (!$id && !$name) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No ID or NAME provided'
      ];
    }

    if ($id) {
      $sql = "SELECT * FROM `attachments` WHERE `id` = :id LIMIT 1";
    } else if ($name) {
      $sql = "SELECT * FROM `attachments` WHERE `name` = :name LIMIT 1";
    }
    $stmt = $conn -> prepare($sql);
    if ($id) {
      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    } else if ($name) {
      $stmt -> bindParam(':name', $name);
    }
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::dbToJsonDetailMapper($detail);
  }

  public function fileCreate($data): array {
    $response = [];
    $options = $data['options'] ?? [];
    $queue = $data['queue'] ?? [];
    $rootPath = $options['path'];
    $pathContext = $options['context'];

    if (!$rootPath) return [];

    foreach ($queue as $file) {
      if (
        $pathContext === 'avatar-user' ||
        $pathContext === 'avatar-member'
      ) {
        $filePath = $rootPath . $pathContext . '/';
      } else {
        $filePath = $rootPath . $file['type'] . '/';
      }

      $fileName = $file['name'] . '.' . $file['extension'];
      $finalFilePath = $filePath . $fileName;

      if (!file_exists($rootPath)) mkdir($rootPath, 0777, true);
      if (!file_exists($filePath)) mkdir($filePath, 0777, true);

      $response[] = file_put_contents($finalFilePath, file_get_contents($file['content']));
    }

    return $response;
  }

  public function createSingle($item): array {
    $conn = self::connection();

    if (empty($item)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $item = self::jsonToDbDetailMapper($item);
    $params = self::getColumnsAndValuesForQuery(self::$tableFields);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `attachments` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $item['type']);
    $stmt -> bindParam(':name', $item['name']);
    $stmt -> bindParam(':file_name', $item['file_name']);
    $stmt -> bindParam(':file_type', $item['file_type']);
    $stmt -> bindParam(':file_ext', $item['file_ext']);
    $stmt -> bindParam(':file_size', $item['file_size'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $item['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $item['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
    ];
  }

  public function create($data): array {
    $id = [];

    foreach ($data as $item) {
      $res = self::createSingle($item);

      $id[] = $res['id'];
    }

    return [
      'id' => $id,
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
    $setParts = self::getQueryParts($data, ['active', 'deleted']);

    $sql = "UPDATE `attachments` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
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

    $sql = "UPDATE `attachments` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
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

    $sql = "UPDATE `attachments` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function analyzeToDelete(): array {
    $conn = self::connection();

    $deleted = 1;

    $sql = "SELECT id FROM `attachments` WHERE `deleted` = :status";
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

  public function deletePermanently($data, $uploadsPath): array {
    $conn = self::connection();

    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No IDs provided'
      ];
    }

    if (!isset($uploadsPath)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No uploads path provided'
      ];
    }

    $placeholders = str_repeat('?,', count($data) - 1) . '?';

    $selectSql = "SELECT `type`, `file_name` FROM `attachments` WHERE id IN ($placeholders)";
    $selectStmt = $conn -> prepare($selectSql);
    $selectStmt -> execute($data);

    $filesToDelete = $selectStmt -> fetchAll(PDO::FETCH_ASSOC);

    $deletedFilesCount = 0;
    $errors = [];

    foreach ($filesToDelete as $file) {
      $filePath = rtrim($uploadsPath, '/') . '/' . $file['type'] . '/' . $file['file_name'];

      if (file_exists($filePath)) {
        if (unlink($filePath)) {
          $deletedFilesCount++;
        } else {
          $errors[] = "Chyba při mazání souboru: " . $filePath;
        }
      } else {
        $errors[] = "Soubor nebyl nalezen: " . $filePath;
      }
    }

    $deleteSql = "DELETE FROM `attachments` WHERE id IN ($placeholders)";
    $deleteStmt = $conn -> prepare($deleteSql);
    $deleteStmt -> execute($data);

    return [
      'rows' => $deleteStmt -> rowCount(),
      'files' => $deletedFilesCount,
      'errors' => $errors,
    ];
  }

}
