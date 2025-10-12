<?php

namespace router;

class Translations extends Router {
  public function resolve($env, $method, $url, $data): array {
    $translations = new \model\Translations;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isIdValidParameter($url)) {
            $id = $url['b'];

            $response = $translations -> getDetail($id);
          } else {
            $response = $translations -> getList();
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
