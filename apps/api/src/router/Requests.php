<?php

namespace router;

class Requests extends Router {
  public function resolve($env, $method, $url, $data): array {
    $requests = new \model\Requests;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
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

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $requests -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $requests -> patch($data);
                break;

              case 'toggle':
                $response = $requests -> toggle($data);
                break;

              case 'delete':
                $response = $requests -> delete($data);
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
