<?php

namespace model;

class Pages {

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
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
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
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$pages,
      ];
    }
  }

}
