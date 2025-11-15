<?php

namespace router;

use model\Translations;
use model\Settings;

class TranslationsRouter extends Router {

  private function getHandler($url, $localesActive): array {
    $translations = new Translations;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $translations -> getDetail($id, $localesActive);
    } else {
      $response = $translations -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $translations = new Translations;
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
                $response = $translations -> create($data, $localesActive);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $translations -> patch($data, $localesActive);
                break;

              case 'toggle':
                $response = $translations -> toggle($data);
                break;

              case 'delete':
                $response = $translations -> delete($data);
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
