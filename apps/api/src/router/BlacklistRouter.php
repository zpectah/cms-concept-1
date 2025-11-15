<?php

namespace router;

use model\Blacklist;

class BlacklistRouter extends Router {

  private function getHandler($url): array {
    $blacklist = new Blacklist;

    $response = [];

    if (self::isIdValidParameter($url)) {
      $id = $url['b'];

      $response = $blacklist -> getDetail($id);
    } else {
      $response = $blacklist -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $blacklist = new Blacklist;

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
                $response = $blacklist -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $blacklist -> patch($data);
                break;

              case 'toggle':
                $response = $blacklist -> toggle($data);
                break;

              case 'delete':
                $response = $blacklist -> delete($data);
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
