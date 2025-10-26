<?php

namespace router;

class MembersRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $members = new \model\Members;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isTwoParameterValid($url)) {
              if (self::isIdValidParameter($url)) {
                $id = $url['b'];

                $response = $members -> getDetail($id, null);
              } else if (self::isEmailValidParameter($url)) {
                $email = $url['b'];

                $response = $members -> getDetail(null, $email);
              }
            } else {
              $response = $members -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'create':
                $response = $members -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $members -> patch($data);
                break;

              case 'toggle':
                $response = $members -> toggle($data);
                break;

              case 'delete':
                $response = $members -> delete($data);
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
