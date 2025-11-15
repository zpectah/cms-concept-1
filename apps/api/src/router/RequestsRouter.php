<?php

namespace router;

use model\Requests;

class RequestsRouter extends Router {

  private function getHandler($url): array {
    $requests = new Requests;

    $response = [];

    if (self::isTwoParameterValid($url)) {
      if (self::isIdValidParameter($url)) {
        $id = $url['b'];

        $response = $requests -> getDetail($id, null);
      } else if (self::isTokenValidParameter($url)) {
        $token = $url['b'];

        $response = $requests -> getDetail(null, $token);
      }
    } else {
      $response = $requests -> getList();
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $requests = new Requests;

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
                $response = $requests -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              // TODO: ... not all fields will be modified

              case 'patch':
                $response = $requests -> patch($data); // TODO: !!
                break;

              case 'toggle':
                $response = $requests -> toggle($data); // TODO: !!
                break;

              case 'delete':
                $response = $requests -> delete($data);// TODO: !!
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
