<?php

namespace router;

class Members extends Router {
  public function resolve($env, $method, $url, $data): array {
    $members = new \model\Members;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isTwoParameterValid($url)) {
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $members -> getDetail($id, null);
            } else if (self::isEmailValidParameter($url)) {
              $email = $url['b'];

              $response = $members -> getDetail(null, $email);
            }
          } else {
            $response = $members -> getList();
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
