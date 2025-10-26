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

  public function getDetail($id, $token): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'token' => $token ?? "sd6f5g4s6d5f4g6s5d4fg-$id",
      'type' => 'password-recovery',
      'active' => true,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

  public function create($data): array {
    // TODO: create new item in table

    return [
      'toCreate' => $data,
    ];
  }

  public function patch($data): array {
    // TODO: patch item in table

    return [
      'toPatch' => $data,
    ];
  }

  public function toggle($data): array {

    return [
      'toToggle' => $data,
    ];
  }

  public function delete($data): array {

    return [
      'toDelete' => $data,
    ];
  }

  public function deletePermanently($data): array {
    /* TODO */

    return [];
  }

}
