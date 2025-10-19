<?php

namespace model;

class Translations extends Model {

  public function getList(): array {
    $translations = [];

    for ($i = 1; $i <= 10; $i++) {
      $translations[] = [
        'id' => $i,
        'name' => "translation-$i",
        'type' => 'default',
//          'locale' => [
//            'en' => [
//              'value' => "Value EN $id",
//            ],
//            'cs' => [
//              'value' => "Value CS $id",
//            ],
//          ],
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$translations,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'translation-' . $id,
      'type' => 'default',
      'locale' => [
        'en' => [
          'value' => "Value EN $id",
        ],
        'cs' => [
          'value' => "Value CS $id",
        ],
      ],
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
