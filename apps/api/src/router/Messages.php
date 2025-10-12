<?php

namespace router;

class Messages {

  private function get($id): array {
    $messages = new \model\Messages;

    if ($id) {
      return $messages -> getDetail($id);
    } else {
      return $messages -> getList();
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
