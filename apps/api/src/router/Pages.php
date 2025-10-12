<?php

namespace router;

class Pages extends Router {
  public function resolve($env, $method, $url, $data): array {
    $pages = new \model\Pages;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isIdValidParameter($url)) {
            $id = $url['b'];

            $response = $pages -> getDetail($id);
          } else {
            $response = $pages -> getList();
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
