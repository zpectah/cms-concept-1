<?php

namespace router;

class Pages extends Router {
  public function resolve($env, $method, $url, $data): array {
    $pages = new \model\Pages;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $pages -> getDetail($id);
            } else {
              $response = $pages -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $pages -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $pages -> patch($data);
                break;

              case 'toggle':
                $response = $pages -> toggle($data);
                break;

              case 'delete':
                $response = $pages -> delete($data);
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
