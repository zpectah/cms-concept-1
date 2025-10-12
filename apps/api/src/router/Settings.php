<?php

namespace router;

class Settings extends Router {
  public function resolve($env, $method, $url, $data): array {
    $settings = new \model\Settings;
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          $response = $settings -> getList();
          break;

        case 'PATCH':
          $response = [
            'request' => $data,
          ];
          break;

      }
    } else if ($env === 'public') {
      $response = [];
    }

    // TODO
    http_response_code(200);

    return $response;
  }

}
