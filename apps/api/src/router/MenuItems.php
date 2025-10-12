<?php

namespace router;

class MenuItems {

  private function get($id, $menuId): array {
    $menuItems = new \model\MenuItems;

    if ($id) {
      return $menuItems -> getDetail($id, $menuId);
    } else {
      return $menuItems -> getList($menuId);
    }

  }

  public function resolve($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':

          if ($url['a'] === 'menu' && $url['b']) {
            $response = $this -> get(null, $url['b']);
          } else if (is_numeric($url['a'])) {
            $response = $this -> get($url['a'], null);
          }

          break;

        case 'PATCH':
        case 'POST':
          $response = [
            'request' => $data,
          ];
          break;

      }
    }
    if ($env === 'public') {}

    // TODO
    http_response_code(200);

    return $response;
  }

}
