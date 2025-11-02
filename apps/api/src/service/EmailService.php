<?php

namespace service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class EmailService {

  public function createEmail($to, $subject, $body, $from = null): bool {
    $mail = new PHPMailer(true);

    $send = false;

    try {
      $mail -> isSMTP();
      $mail -> SMTPAuth = true;
      $mail -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
      $mail -> Port = 587;
      $mail -> Host = 'sandbox.smtp.mailtrap.io';
      $mail -> Username = 'bd6724021417be';
      $mail -> Password = '878cf6de82ad75';

      $mail -> setFrom('noreply@your-domain.com', 'Your domain');
      $mail -> addAddress($to);

      $mail -> isHTML(true);
      $mail -> Subject = $subject;
      $mail -> Body = $body;
      $mail -> AltBody = 'Dobrý den, toto je textová verze testovacího emailu.';

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
