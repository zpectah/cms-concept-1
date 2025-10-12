<?php

namespace model;

class Pages extends Model {

  public function getList(): array {
    $pages = [];

    for ($i = 1; $i <= 25; $i++) {
      $isEven = $i % 2;
      $pages[] = [
        'id' => $i,
        'name' => "page-name-$i",
        'type' => 'default',
//                'locale' => [
//                  'en' => [
//                    'title' => "Article title EN $i",
//                    'description' => "Article description EN $i",
//                    'content' => "Article content EN $i",
//                  ],
//                  'cs' => [
//                    'title' => "Article title CS $i",
//                    'description' => "Article description CS $i",
//                    'content' => "Article content CS $i",
//                  ],
//                ],
        'active' => $isEven,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$pages,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'page-name-' . $id,
      'type' => 'default',
      'locale' => [
        'en' => [
          'title' => "Page title EN $id",
          'description' => "Page description EN $id",
          'content' => "Page content EN $id",
        ],
        'cs' => [
          'title' => "Page title CS $id",
          'description' => "Page description CS $id",
          'content' => "Page content CS $id",
        ],
      ],
      'active' => true,
      'deleted' => false,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

}
