<?php

namespace model;

class Members {

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
        'name' => 'member-name-' . $id,
        'type' => 'default',

        'email' => 'email-' . $id . '@company.com',
        // 'password' => 'Random string',
        'firstName' => 'First name ' . $id,
        'lastName' => 'Last name ' . $id,

        'address' => [
          'street' => 'Street',
          'streetNo' => '125/15B',
          'district' => 'District',
          'city' => 'My City',
          'country' => 'My Country',
          'zip' => '555248',
          'flatNo' => '17d',
        ],

        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $members = [];

      for ($i = 1; $i <= 25; $i++) {
        $isEven = $i % 2;
        $members[] = [
          'id' => $i,
          'name' => "member-name-$i",
          'type' => 'default',

          'email' => 'email-' . $i . '@company.com',
          // 'password' => 'Random string',
          'firstName' => 'First name ' . $i,
          'lastName' => 'Last name ' . $i,

          'active' => $isEven,
          'deleted' => false,
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$members,
      ];
    }
  }

}
