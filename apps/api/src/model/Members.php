<?php

namespace model;

class Members extends Model {

  public function getList(): array {
    $members = [];

    for ($i = 1; $i <= 25; $i++) {
      $isEven = $i % 2;
      $members[] = [
        'id' => $i,
        'name' => "member-name-$i",
        'type' => 'default',

        'email' => 'email-' . $i . '@company.com',
        // 'password' => 'Random string',
        'firstName' => 'First name ' . $i,
        'lastName' => 'Last name ' . $i,

        'active' => $isEven,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$members,
    ];
  }

  public function getDetail($id, $email): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'member-name-' . $id,
      'type' => 'default',

      'email' => $email ?? 'email-' . $id . '@company.com',
      // 'password' => 'Random string',
      'firstName' => 'First name ' . $id,
      'lastName' => 'Last name ' . $id,

      'address' => [
        'street' => 'Street',
        'streetNo' => '125/15B',
        'district' => 'District',
        'city' => 'My City',
        'country' => 'My Country',
        'zip' => '555248',
      ],

      'flatNo' => '17d',

      'active' => true,
      'deleted' => false,
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

}
