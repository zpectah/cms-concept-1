<?php

namespace model;

class Translations {

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
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
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
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$translations,
      ];
    }
  }

}
