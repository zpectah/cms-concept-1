<?php

namespace router;

class Messages extends Router {
  public function resolve($env, $method, $url, $data): array {
    $messages = new \model\Messages;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $messages -> getDetail($id);
            } else {
              $response = $messages -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $messages -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $messages -> patch($data);
                break;

              case 'toggle':
                $response = $messages -> toggle($data);
                break;

              case 'delete':
                $response = $messages -> delete($data);
                break;

              case 'read':
                $response = $messages -> read($data);
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
