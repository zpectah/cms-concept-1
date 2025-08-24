<?php

namespace model;

class Comments {

  public function process($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':

          if ($url['a'] && $url['b']) {
            $response = $this -> get(null, $url['a'], $url['b']);
          } else if (is_numeric($url['a'])) {
            $response = $this -> get($url['a'], null, null);
          }

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

  private function get($id, $contentType, $contentId): array {
    $now = date('c'); // ISO 8601 format

    if ($id) {
      // Mock detail
      return [
        'id' => $id,
        'name' => 'comment-' . $id,
        'type' => 'default',
        'sender' => 'sender.012' . $id . '@sender.com',
        'subject' => 'Fusce tristique pellentesque dapibus - ' . $id,
        'content' => 'Lorem bibendum curabitur sollicitudin molestie mi tincidunt ultrices placerat sem vehicula placerat eget commodo blandit',
        'content_type' => $contentType ?? 'unknown',
        'content_id' => $contentId ?? 0,
        'parent' => 0,
        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $comments = [];

      for ($i = 1; $i <= 5; $i++) {
        $comments[] = [
          'id' => $i,
          'name' => "comment-$i",
          'type' => 'default',
          'sender' => 'sender.012' . $id . '@sender.com',
          'subject' => 'Fusce tristique pellentesque dapibus - ' . $id,
          'content' => 'Lorem bibendum curabitur sollicitudin molestie mi tincidunt ultrices placerat sem vehicula placerat eget commodo blandit',
          'content_type' => $contentType ?? 'unknown',
          'content_id' => $contentId ?? 0,
          'parent' => 0,
          'active' => true,
          'deleted' => false,
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$comments,
      ];
    }
  }

}
