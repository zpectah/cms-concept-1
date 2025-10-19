<?php

namespace router;

class Articles extends Router {
  public function resolve($env, $method, $url, $data): array {
    $articles = new \model\Articles;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $articles -> getDetail($id);
            } else {
              $response = $articles -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $articles -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $articles -> patch($data);
                break;

              case 'toggle':
                $response = $articles -> toggle($data);
                break;

              case 'delete':
                $response = $articles -> delete($data);
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
