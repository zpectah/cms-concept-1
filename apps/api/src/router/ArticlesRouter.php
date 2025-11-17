<?php

namespace router;

use model\Articles;
use model\Settings;

class ArticlesRouter extends Router {

  private function getHandler($url, $localesActive): array {
    $articles = new Articles;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $articles -> getDetail($id, $localesActive);
    } else {
      $response = $articles -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $articles = new Articles;
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
                $response = $articles -> create($data, $localesActive);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $articles -> patch($data, $localesActive);
                break;

              case 'toggle':
                $response = $articles -> toggle($data);
                break;

              case 'delete':
                $response = $articles -> delete($data);
                break;

              case 'approve':
                $response = $articles -> approve($data);
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
