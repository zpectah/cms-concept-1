<?php

namespace router;

class Articles extends Router {
  public function resolve($env, $method, $url, $data): array {
    $articles = new \model\Articles;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isIdValidParameter($url)) {
            $id = $url['b'];

            $response = $articles -> getDetail($id);
          } else {
            $response = $articles -> getList();
          }
          break;

        case 'PATCH':
        case 'POST':
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
