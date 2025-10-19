<?php

namespace router;

class Comments extends Router {
  public function resolve($env, $method, $url, $data): array {
    $comments = new \model\Comments;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isTwoParameterValid($url)) {
              if (self::isIdValidParameter($url)) {
                $id = $url['b'];

                $response = $comments -> getDetail($id, null, null);
              } else {
                $contentType = $url['a'];
                $contentId = $url['b'];

                $response = $comments -> getList($contentType, $contentId);
              }
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $comments -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $comments -> patch($data);
                break;

              case 'toggle':
                $response = $comments -> toggle($data);
                break;

              case 'delete':
                $response = $comments -> delete($data);
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
