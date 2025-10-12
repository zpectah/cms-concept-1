<?php

namespace router;

class Translations {

  private function get($id): array {
    $translations = new \model\Translations;

    if ($id) {
      return $translations -> getDetail($id);
    } else {
      return $translations -> getList();
    }

  }

  public function resolve($env, $method, $url, $data): array {
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

}
