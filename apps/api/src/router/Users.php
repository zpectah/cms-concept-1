<?php

namespace router;

class Users extends Router {
  public function resolve($env, $method, $url, $data): array {
    $users = new \model\Users;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isTwoParameterValid($url)) {
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $users -> getDetail($id, null);
            } else if (self::isEmailValidParameter($url)) {
              $email = $url['b'];

              $response = $users -> getDetail(null, $email);
            }
          } else {
            $response = $users -> getList();
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
