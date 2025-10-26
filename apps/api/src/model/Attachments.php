<?php

namespace model;

class Attachments extends Model {

  public function getList(): array {
    $attachments = [];

    for ($i = 1; $i <= 15; $i++) {
      $attachments[] = [
        'id' => $i,
        'name' => "test-image-00$i",
        'type' => 'image',

        'file_name' => 'test-image-001.jpg',
        'file_type' => 'image/jpeg',
        'file_ext' => 'png',
        'file_size' => 125454,

        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$attachments,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'test-image-00' . $id,
      'type' => 'image',

      'file_name' => 'test-image-001.jpg',
      'file_type' => 'image/jpeg',
      'file_ext' => 'png',
      'file_size' => 125454,

      'active' => true,
      'deleted' => false,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

  public function fileCreate($data): array {
    $response = [];
    $options = $data['options'] ?? [];
    $queue = $data['queue'] ?? [];
    $rootPath = $options['path'];

    if (!$rootPath) return [];

    foreach ($queue as $file) {
      $filePath = $rootPath . $file['type'] . '/';
      $fileName = $file['name'] . '.' . $file['extension'];
      $finalFilePath = $filePath . $fileName;

      if (!file_exists($rootPath)) mkdir($rootPath, 0777, true);
      if (!file_exists($filePath)) mkdir($filePath, 0777, true);

      $response[] = file_put_contents($finalFilePath, file_get_contents($file['content']));
    }

    return $response;
  }

  public function create($data): array {
    // TODO: create new item in table

    return [
      'toCreate' => $data,
    ];
  }

  public function patch($data): array {
    // TODO: patch item in table

    return [
      'toPatch' => $data,
    ];
  }

  public function toggle($data): array {

    return [
      'toToggle' => $data,
    ];
  }

  public function delete($data): array {

    return [
      'toDelete' => $data,
    ];
  }

  public function deletePermanently($data): array {
    /* TODO */

    return [];
  }

}
