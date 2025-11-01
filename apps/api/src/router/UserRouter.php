<?php

namespace router;

class UserRouter extends Router {

  private function get(): array {
    $users = new \model\Users;
    $sessionService = new \service\SessionService;

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

    return $response;
  }

  private function patch($data): array {
    $users = new \model\Users;
    $sessionService = new \service\SessionService;

    $response = [];

    $session = $sessionService -> getActiveSession('user');

    if ($session['active']) {
      $email = $session['session']['email'];

      if ($email === $data['email']) {
        $response = $users -> patch($data);
      } else {
        // TODO
      }
    } else {
      // TODO
    }

    return $response;
  }

  private function passwordRecoveryRequestHandler($data): array {
    $users = new \model\Users;
    $requests = new \model\Requests;
    $emailService = new \service\EmailService;

    $response = [
      'tokenCreated' => false,
      'requestCreated' => false,
      'emailCreated' => false,
      'emailSend' => false,
    ];

    $email = $data['email'];
    $user = $users -> getDetail(null, $email);

    if (isset($user['id'])) {
      $token = getRandomString(24);

      $request = [
        'type' => $data['type'],
        'token' => $token,
        'applicant' => $email,
        'status' => 1,
      ];
      $requestCreated = $requests -> create($request);

      $emailBody = $emailService -> createPasswordRecoveryEmail([ 'token' => $token, 'path' => $data['path'], ]);
      // $emailSend = $emailService -> sendHtmlEmail($email, 'Password recovery', $emailBody, 'noreply@domain.com');
      $emailSend = $emailService -> createEmail($email, 'Password recovery', $emailBody, 'noreply@domain.com');

      $response['tokenCreated'] = !!$token;
      $response['requestCreated'] = !!$requestCreated['id'];
      $response['emailCreated'] = !!$emailBody;
      $response['emailSend'] = !!$emailSend;
    }

    return $response;
  }

  private function passwordRecoveryRequestCheckHandler($data): array {
    $requests = new \model\Requests;

    $token = $data['token'];
    $request = $requests -> getDetail(null, $token);

    $response = [
      'email' => null,
    ];

    if (isset($request['id'])) {
      $response['id'] = $request['id'];
      $response['email'] = $request['applicant'];
    }

    return $response;
  }

  private function passwordRecoveryPasswordHandler($data): array {
    $users = new \model\Users;
    $requests = new \model\Requests;

    $response = [
      'requestActive' => false,
      'userActive' => false,
      'userUpdated' => false,
      'requestUpdated' => false,
    ];

    $token = $data['token'];
    // $email = $data['email'];
    $password = $data['password'];

    $request = self::passwordRecoveryRequestCheckHandler([ 'token' => $token ]);

    if ($request['id']) {
      $response['requestActive'] = true;

      $id = $request['id'];
      $email = $request['email'];

      $user = $users -> getDetail(null, $email);

      if (isset($user['id'])) {
        $changedPassword = $users -> changePassword([ 'email' => $email, 'password' => $password ]);
        $changedRequest = $requests -> toggle([ $id ]);

        $response['userActive'] = true;
        $response['userUpdated'] = $changedPassword['rows'] === 1;
        $response['requestUpdated'] = $changedRequest['rows'] === 1;
      }
    }

    return $response;
  }


  public function resolve($env, $method, $url, $data): array {
    $users = new \model\Users;
    $sessionService = new \service\SessionService;

    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            $response = self::get();
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

              case 'password-recovery-request':
                $response = self::passwordRecoveryRequestHandler($data);
                break;

              case 'password-recovery-request-check':
                $response = self::passwordRecoveryRequestCheckHandler($data);
                break;

              case 'password-recovery-token':
                $response = self::passwordRecoveryPasswordHandler($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = self::patch($data);
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
