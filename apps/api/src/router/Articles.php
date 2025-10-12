<?php

namespace router;

class Articles {

  private function get($id): array {
    $articles = new \model\Articles;

    if ($id) {
      return $articles -> getDetail($id);
    } else {
      return $articles -> getList();
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
