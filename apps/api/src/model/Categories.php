<?php

namespace model;

class Categories extends Model {

  public function getList(): array {
    $categories = [];

    for ($i = 1; $i <= 25; $i++) {
      $categories[] = [
        'id' => $i,
        'name' => "category-name-$i",
        'type' => 'default',
//                'locale' => [
//                  'en' => [
//                    'title' => "Category title EN $i",
//                    'description' => "Category description EN $i",
//                  ],
//                  'cs' => [
//                    'title' => "Category title CS $i",
//                    'description' => "Category description CS $i",
//                  ],
//                ],
        'parent' => 0,
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$categories,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'category-name-' . $id,
      'type' => 'default',
      'locale' => [
        'en' => [
          'title' => "Category title EN $id",
          'description' => "Category description EN $id",
        ],
        'cs' => [
          'title' => "Category title CS $id",
          'description' => "Category description CS $id",
        ],
      ],
      'parent' => 0,
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
