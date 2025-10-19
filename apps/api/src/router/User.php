<?php

namespace router;

class User extends Router {
  public function resolve($env, $method, $url, $data): array {

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:

            // TODO

            $response = [];
            break;

          case self::method_post:

            // TODO

            $response = [];
            break;

          case self::method_patch:

            // TODO

            $response = [];
            break;

        }
        break;

      case self::env_public:
        http_response_code(400);
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
