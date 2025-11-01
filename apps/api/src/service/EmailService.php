<?php

namespace service;

class EmailService {

  public function sendHtmlEmail($to, $subject, $body, $from = null): bool {
    $headers = "MIME-Version: 1.0" . "\r\n";
    // $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
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
