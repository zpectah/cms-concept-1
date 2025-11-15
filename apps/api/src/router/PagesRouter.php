<?php

namespace router;

use model\Pages;
use model\Settings;

class PagesRouter extends Router {

  private function getHandler($url, $localesActive): array {
    $pages = new Pages;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $pages -> getDetail($id, $localesActive);
    } else {
      $response = $pages -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $pages = new Pages;
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
                $response = $pages -> create($data, $localesActive);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $pages -> patch($data, $localesActive);
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
