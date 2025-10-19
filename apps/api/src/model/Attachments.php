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
    // TODO: create new file

    return [
      'toCreateFiles' => $data,
    ];
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

}
