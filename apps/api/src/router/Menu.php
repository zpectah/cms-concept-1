<?php

namespace router;

class Menu extends Router {
  public function resolve($env, $method, $url, $data): array {
    $menu = new \model\Menu;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isIdValidParameter($url)) {
            $id = $url['b'];

            $response = $menu -> getDetail($id);
          } else {
            $response = $menu -> getList();
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
