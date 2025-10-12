<?php

namespace model;

class Blacklist extends Model {

  public function getList(): array {
    $blacklist = [];

    for ($i = 1; $i <= 10; $i++) {
      $isEven = $i % 2;

      $blacklist[] = [
        'id' => $i,
        'type' => 'default',
        'ipaddress' => $isEven ? '123.456.789.' . $i : '',
        'email' => $isEven ? '' : 'blockedemail-' . $i . '@email.com',
        'active' => true,
        'created' => $this -> getNow(),
      ];
    }

    return [
      ...$blacklist,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'type' => 'default',
      'ipaddress' => $isEven ? '123.456.789.' . $id : '',
      'email' => $isEven ? '' : 'blockedemail-' . $id . '@email.com',
      'active' => true,
      'created' => $this -> getNow(),
    ];
  }

}
