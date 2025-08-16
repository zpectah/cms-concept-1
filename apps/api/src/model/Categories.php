<?php

namespace model;

class Categories {

  public function process($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          $id = $url['a'];
          $response = $this -> get($id);
          break;

        case 'PATCH':
        case 'POST':
          $response = [
            'request' => $data,
          ];
          break;

      }
    }
    if ($env === 'public') {}

    // TODO
    http_response_code(200);

    return $response;
  }

  public function get($id): array {
    $now = date('c'); // ISO 8601 format

    if ($id) {
      // Mock detail
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
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
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
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$categories,
      ];
    }
  }

}
