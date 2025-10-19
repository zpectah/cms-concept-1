<?php

namespace router;

class Translations extends Router {
  public function resolve($env, $method, $url, $data): array {
    $translations = new \model\Translations;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $translations -> getDetail($id);
            } else {
              $response = $translations -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $translations -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $translations -> patch($data);
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
