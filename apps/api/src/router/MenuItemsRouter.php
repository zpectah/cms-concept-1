<?php

namespace router;

class MenuItemsRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $menuItems = new \model\MenuItems;

    $settings = new \model\Settings;
    $localesActive = $settings -> getTable()['locales']['active'];

    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
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
