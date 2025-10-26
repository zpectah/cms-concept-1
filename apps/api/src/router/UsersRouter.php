<?php

namespace router;

class UsersRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $users = new \model\Users;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
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

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $users -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $users -> patch($data);
                break;

              case 'toggle':
                $response = $users -> toggle($data);
                break;

              case 'delete':
                $response = $users -> delete($data);
                break;

            }
            break;

        }
        break;

      case self::env_public:
        $response = [];
        break;

      default:
        http_response_code(200);
        $response = [];
        break;
    }

    return $response;
  }

}
