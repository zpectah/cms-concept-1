<?php

namespace model;

class Tags extends Model {

  public function getList(): array {
    $tags = [];

    for ($i = 1; $i <= 10; $i++) {
      $tags[] = [
        'id' => $i,
        'name' => "tag-name-$i",
        'type' => 'default',
        'color' => 'none',
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$tags,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'tag-name-' . $id,
      'type' => 'default',
      'color' => 'red',
      'active' => true,
      'deleted' => false,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
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
