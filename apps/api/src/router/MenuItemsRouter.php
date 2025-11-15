<?php

namespace router;

use model\MenuItems;
use model\Settings;

class MenuItemsRouter extends Router {

  private function getHandler($url, $localesActive): array {
    $menuItems = new MenuItems;

    $response = [];

    if (self::isTwoParameterValid($url)) {
      if (self::isIdValidParameter($url)) {
        $id = $url['b'];

        $response = $menuItems -> getDetail($id, $localesActive);
      } else if (self::isMenuIdValidParameter($url)) {
        $menuId = $url['b'];

        $response = $menuItems -> getList($menuId);
      } else {
        $response = $menuItems -> getList(null);
      }
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $menuItems = new MenuItems;
    $settings = new Settings;

    $localesActive = $settings -> getTable()['locales']['active'];

    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            $response = self::getHandler($url, $localesActive);
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $menuItems -> create($data, $localesActive);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $menuItems -> patch($data, $localesActive);
                break;

              case 'toggle':
                $response = $menuItems -> toggle($data);
                break;

              case 'delete':
                $response = $menuItems -> delete($data);
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
