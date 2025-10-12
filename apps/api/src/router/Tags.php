<?php

namespace router;

class Tags extends Router {
  public function resolve($env, $method, $url, $data): array {
    $tags = new \model\Tags;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isIdValidParameter($url)) {
            $id = $url['b'];

            $response = $tags -> getDetail($id);
          } else {
            $response = $tags -> getList();
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
