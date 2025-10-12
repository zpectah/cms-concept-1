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

}
