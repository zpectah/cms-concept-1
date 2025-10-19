<?php

namespace model;

class Messages extends Model {

  public function getList(): array {
    $messages = [];

    for ($i = 1; $i <= 10; $i++) {
      $messages[] = [
        'id' => $i,
        'name' => "message-$i",
        'type' => 'default',
        'sender' => 'sender.012' . $i . '@sender.com',
        'read' => false,
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$messages,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'message-' . $id,
      'type' => 'default',
      'sender' => 'sender.012' . $id . '@sender.com',
      'subject' => 'Fusce tristique pellentesque dapibus - ' . $id,
      'content' => 'Lorem bibendum curabitur sollicitudin molestie mi tincidunt ultrices placerat sem vehicula placerat eget commodo blandit',
      'read' => false,
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

  public function read($data): array {

    return [
      'toRead' => $data,
    ];
  }

}
