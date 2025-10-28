<?php

namespace router;

class UserRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $users = new \model\Users;
    $sessionService = new \service\SessionService;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            $session = $sessionService -> getActiveSession('user');

            if ($session['active']) {
              $email = $session['session']['email'];

              $response = [
                'active' => true,
                'user' => $users -> getDetail(null, $email),
              ];
            } else {
              $response = [
                'active' => false,
                'user' => null,
              ];
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'check-email':
                $response = $users -> checkEmail($data);
                break;

              case 'check-password':
                $response = $users -> checkPassword($data);
                break;

              case 'login':
                $response = $sessionService -> openEntitySession('user', $data);
                break;

              case 'logout':
                $response = $sessionService -> closeEntitySession('user', $data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $session = $sessionService -> getActiveSession('user');

                if ($session['active']) {
                  $email = $session['session']['email'];
                  if ($email === $data['email']) {
                    $response = $users -> patch($data);
                  } else {
                    // TODO
                    $response = [];
                  }
                } else {
                  // TODO
                  $response = [];
                }
                break;

            }
            break;

        }
        break;

      case self::env_public:
        // NOT SUPPORTED
        http_response_code(400);
        $response = [];
        break;

      default:
        // NO DATA
        http_response_code(200);
        $response = [];
        break;

    }

    return $response;
  }

}
