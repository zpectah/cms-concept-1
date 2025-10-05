<?php

namespace model;

class Settings {

  public function process($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          $response = $this -> get();
          break;

        case 'PATCH':
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

  public function get(): array {
    // TODO
    return [
      'project' => [
        'name' => 'PROJECT NAME',
        'description' => 'PROJECT DESCRIPTION',
      ],

      'locales' => [
        'active' => ['en', 'cs'],
        'default' => 'en',
        'available' => ['en', 'cs', 'sk', 'de'],
      ],

      'company' => [
        'name' => 'COMPANY NAME',
        'description' => '... COMPANY DESCRIPTION ...',
        'email' => ['test.01234@email.test.com', 'test2@email.com'],
        'phone' => ['777 123 456', '777 485 263'],
        'address' => [
          'street' => 'Street',
          'streetNo' => '125/15B',
          'district' => 'District',
          'city' => 'My City',
          'country' => 'My Country',
          'zip' => '555248'
        ],
        'location' => [0, 0],
        'bank' => '0000/123456789/0330',
        'id' => 'CZ56456787484'
      ],

      'meta' => [
        'title' => 'APP TITLE',
        'description' => 'APP DESCRIPTION',
        'keywords' => ['key1', 'key2', 'key3'],
        'robots' => 'all',
      ],

      'state' => [
        'debug' => true,
        'maintenance' => false,
      ],

      'messages' => [
        'active' => true,
        'recipients' => ['test2@email.com'],
      ],

      'comments' => [
        'active' => true,
        'anonymous' => false,
      ],

      'members' => [
        'active' => true,
      ],

    ];
  }

}
