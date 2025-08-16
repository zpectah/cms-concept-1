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
    return [
      'project_name' => 'Project name',
      'project_description' => 'Project description ...',

      'locales_active' => ['en', 'cs'],
      'locales_default' => 'en',
      'locales_available' => ['en', 'cs', 'sk', 'de'],
    ];
  }

}
