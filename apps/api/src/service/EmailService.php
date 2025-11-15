<?php

namespace service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService {

  public function createEmail($to, $subject, $body, $credentials, $altBody = null): bool {
    $mail = new PHPMailer(true);

    $send = false;

    $smtp_port = $credentials['smtp_port'];
    $smtp_host = $credentials['smtp_host'];
    $smtp_username = $credentials['smtp_username'];
    $smtp_password = $credentials['smtp_password'];

    $from_email = $credentials['from'];
    $from_domain = $credentials['domain'];

    if (
      !isset($smtp_port) &&
      !isset($smtp_host) &&
      !isset($smtp_username) &&
      !isset($smtp_password) &&
      $smtp_password
    ) return false;

    try {
      $mail -> isSMTP();
      $mail -> SMTPAuth = true;
      $mail -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

      $mail -> Port = $smtp_port;
      $mail -> Host = $smtp_host;
      $mail -> Username = $smtp_username;
      $mail -> Password = $smtp_password;

      $mail -> setFrom($from_email, $from_domain);
      $mail -> addAddress($to);

      $mail -> isHTML(true);
      $mail -> Subject = $subject;
      $mail -> Body = $body;

      if (isset($altBody)) $mail -> AltBody = $altBody;

      $send = $mail -> send();
    } catch (Exception $e) {
      $send = $mail -> ErrorInfo;
    }

    return $send;
  }

  public function createPasswordRecoveryEmail($data): string {
    $token = $data['token'];
    $path = $data['path'];

    // TODO

    return '<html lang="en">
      <head>
        <title>HTML Email</title>
      </head>
      <body>
        <p>
          Tady je odkaz pro obnovu hesla. <br />
          <a href="' . $path . '?token=' . $token . '">Obnovit heslo</a>
        </p>
      </body>
      </html>';
  }

}
