<?php

namespace router;

class Tags extends Router {
  public function resolve($env, $method, $url, $data): array {
    $tags = new \model\Tags;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $tags -> getDetail($id);
            } else {
              $response = $tags -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $tags -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $tags -> patch($data);
                break;

              case 'toggle':
                $response = $tags -> toggle($data);
                break;

              case 'delete':
                $response = $tags -> delete($data);
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
