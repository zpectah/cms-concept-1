<?php

namespace router;

class Settings {

  private function get(): array {
    $settings = new \model\Settings;

    return $settings -> getList();
  }

  public function resolve($env, $method, $url, $data): array {
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

}
