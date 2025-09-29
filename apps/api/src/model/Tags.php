<?php

namespace model;

class Tags {

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
        'name' => 'tag-name-' . $id,
        'type' => 'default',
        'color' => 'red',
        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $tags = [];

      for ($i = 1; $i <= 10; $i++) {
        $tags[] = [
          'id' => $i,
          'name' => "tag-name-$i",
          'type' => 'default',
          'color' => 'none',
          'active' => true,
          'deleted' => false,
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$tags,
      ];
    }
  }

}
