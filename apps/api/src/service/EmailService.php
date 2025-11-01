<?php

namespace service;

class EmailService {

  public function createEmail($to, $subject, $body, $from = null): bool {
    $mailer = new \PHPMailer\PHPMailer\PHPMailer(true);

    $mailer -> CharSet = 'UTF-8';
    $mailer -> isHTML(true);

    if ($from) {
      $mailer -> setFrom($from);
    } else {
      $mailer -> setFrom("noreply@domain.com"); // TODO
    }

    $mailer -> isMail();

    $mailer -> Subject = $subject;

    $mailer -> addAddress($to);

    $mailer -> Body = $body;

    return $mailer -> send();
  }

  public function sendHtmlEmail($to, $subject, $body, $from = null): bool {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: multipart/mixed; charset=UTF-8; boundary=\"boundary-string\"\r\n";

    if ($from) $headers .= "From: domain.com <{$from}>" . "\r\n";

    return mail($to, $subject, $body, $headers);
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
