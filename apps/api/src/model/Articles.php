<?php

namespace model;

class Articles {

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
      $isEven = $id % 2;

      return [
        'id' => $id,
        'name' => 'article-name-' . $id,
        'type' => $isEven ? 'default' : 'event',
        'locale' => [
          'en' => [
            'title' => "Article title EN $id",
            'description' => "Article description EN $id",
            'content' => "Article content EN $id",
          ],
          'cs' => [
            'title' => "Article title CS $id",
            'description' => "Article description CS $id",
            'content' => "Article content CS $id",
          ],
        ],
        'startDate' => $now,
        'endDate' => $now,
        'location' => 'Some location',
        'categories' => [1,2],
        'tags' => [2,3],
        'attachments' => [3,4],
        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $articles = [];

      for ($i = 1; $i <= 25; $i++) {
        $isEven = $i % 2;
        $articles[] = [
          'id' => $i,
          'name' => "article-name-$i",
          'type' => $isEven ? 'default' : 'event',
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
          'startDate' => $now,
          'endDate' => $now,
          'location' => 'Some location',
          'categories' => $isEven ? [1,2] : [3,4],
          'tags' => $isEven ? [2,3] : [4,5],
          'attachments' => $isEven ? [3,4] : [5,6,7],
          'active' => $isEven,
          'deleted' => false,
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$articles,
      ];
    }
  }

}
