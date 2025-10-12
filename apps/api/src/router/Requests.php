<?php

namespace router;

class Requests extends Router {
  public function resolve($env, $method, $url, $data): array {
    $requests = new \model\Requests;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isTwoParameterValid($url)) {
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $requests -> getDetail($id, null);
            } else if (self::isTokenValidParameter($url)) {
              $token = $url['b'];

              $response = $requests -> getDetail(null, $token);
            }
          } else {
            $response = $requests -> getList();
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
