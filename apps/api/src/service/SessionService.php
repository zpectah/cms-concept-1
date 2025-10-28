<?php

namespace service;

class SessionService {

  private function startSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }
  }


  public function openEntitySession($entity, $data): array {
    $this -> startSession();

    $id = $data['id'];
    $email = $data['email'];
    // $token = '';

    $_SESSION[$entity] = [
      'id' => $id,
      'email' => $email,
      // 'token' => $token,
    ];

    return [
      'open' => !!$_SESSION['user'],
      'session' => $_SESSION['user'],
    ];
  }

  public function getActiveSession($entity): array {
    $this -> startSession();

    if (!empty($_SESSION[$entity])) {
      return [
        'active' => true,
        'session' => $_SESSION[$entity],
      ];
    }

    return [
      'active' => false,
      'session' => null,
    ];
  }

  public function closeEntitySession($entity, $data): array {
    $this -> startSession();

    $_SESSION[$entity] = [];

    unset($_SESSION[$entity]);

    if (session_id() !== '' || isset($_COOKIE[session_name()])) {
      setcookie(session_name(), '', time() - 42000, '/');
    }

    session_destroy();

    return [
      'open' => !!$_SESSION[$entity],
      'session' => null,
    ];
  }

}
