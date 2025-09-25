<?php

namespace model;

class Messages {

  public function process($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          $id = $url['a'];
          $response = $this -> get($id);
          break;

        case 'PATCH':
        case 'POST':
          $response = [
            'request' => $data,
          ];
          break;

      }
    }
    if ($env === 'public') {}

    // TODO
    http_response_code(200);

    return $response;
  }

  public function get($id): array {
    $now = date('c'); // ISO 8601 format

    if ($id) {
      // Mock detail
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
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
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
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$messages,
      ];
    }
  }

}
