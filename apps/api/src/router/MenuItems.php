<?php

namespace router;

class MenuItems extends Router {
  public function resolve($env, $method, $url, $data): array {
    $menuItems = new \model\MenuItems;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isTwoParameterValid($url)) {
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $menuItems -> getDetail($id, null);
            } else if (self::isMenuIdValidParameter($url)) {
              $menuId = $url['b'];

              $response = $menuItems -> getList($menuId);
            } else {
              $response = $menuItems -> getList(null);
            }
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
