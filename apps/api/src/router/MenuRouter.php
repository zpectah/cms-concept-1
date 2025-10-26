<?php

namespace router;

class MenuRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $menu = new \model\Menu;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $menu -> getDetail($id);
            } else {
              $response = $menu -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $menu -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $menu -> patch($data);
                break;

              case 'toggle':
                $response = $menu -> toggle($data);
                break;

              case 'delete':
                $response = $menu -> delete($data);
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
