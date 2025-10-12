<?php

namespace model;

class Requests extends Model {

  public function getList(): array {
    $requests = [];

    for ($i = 1; $i <= 10; $i++) {
      $requests[] = [
        'id' => $i,
        'token' => "sd6f5g4s6d5f4g6s5d4fg-$i",
        'type' => 'password-recovery',
        'active' => true,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$requests,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'token' => "sd6f5g4s6d5f4g6s5d4fg-$id",
      'type' => 'password-recovery',
      'active' => true,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

}
