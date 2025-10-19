<?php

namespace router;

class Categories extends Router {
  public function resolve($env, $method, $url, $data): array {
    $categories = new \model\Categories;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $categories -> getDetail($id);
            } else {
              $response = $categories -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $categories -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $categories -> patch($data);
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
