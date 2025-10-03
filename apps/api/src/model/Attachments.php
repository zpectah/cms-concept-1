<?php

namespace model;

class Attachments {

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
        'name' => 'test-image-00' . $id,
        'type' => 'image',

        'file_name' => 'test-image-001.jpg',
        'file_type' => 'image/jpeg',
        'file_ext' => 'png',
        'file_size' => 125454,

        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $categories = [];

      for ($i = 1; $i <= 15; $i++) {
        $categories[] = [
          'id' => $i,
          'name' => "test-image-00$i",
          'type' => 'image',

          'file_name' => 'test-image-001.jpg',
          'file_type' => 'image/jpeg',
          'file_ext' => 'png',
          'file_size' => 125454,

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
