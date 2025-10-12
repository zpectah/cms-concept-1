<?php

namespace model;

class Comments extends Model {

  public function getList($contentType, $contentId): array {
    $comments = [];

    for ($i = 1; $i <= 5; $i++) {
      $comments[] = [
        'id' => $i,
        'name' => "comment-$i",
        'type' => 'default',
        'sender' => 'sender.012' . $i . '@sender.com',
        'subject' => 'Fusce tristique pellentesque dapibus - ' . $i,
        'content' => 'Lorem bibendum curabitur sollicitudin molestie mi tincidunt ultrices placerat sem vehicula placerat eget commodo blandit',
        'content_type' => $contentType ?? 'unknown',
        'content_id' => $contentId ?? 0,
        'parent' => 0,
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$comments,
    ];
  }

  public function getDetail($id, $contentType, $contentId): array {
    $isEven = $id % 2;

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
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

}
