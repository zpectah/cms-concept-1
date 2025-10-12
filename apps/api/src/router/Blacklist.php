<?php

namespace router;

class Blacklist {

  private function get($id): array {
    $blacklist = new \model\Blacklist;

    if ($id) {
      return $blacklist -> getDetail($id);
    } else {
      return $blacklist -> getList();
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
