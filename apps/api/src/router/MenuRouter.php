<?php

namespace router;

use model\Menu;

class MenuRouter extends Router {

  private function getHandler($url): array {
    $menu = new Menu;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $menu -> getDetail($id);
    } else {
      $response = $menu -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $menu = new Menu;

    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            $response = self::getHandler($url);
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
