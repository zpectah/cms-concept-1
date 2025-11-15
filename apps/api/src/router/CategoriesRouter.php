<?php

namespace router;

use model\Categories;
use model\Settings;

class CategoriesRouter extends Router {

  private function getHandler($url, $localesActive): array {
    $categories = new Categories;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $categories -> getDetail($id, $localesActive);
    } else {
      $response = $categories -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $categories = new Categories;
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
                $response = $categories -> create($data, $localesActive);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $categories -> patch($data, $localesActive);
                break;

              case 'toggle':
                $response = $categories -> toggle($data);
                break;

              case 'delete':
                $response = $categories -> delete($data);
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
