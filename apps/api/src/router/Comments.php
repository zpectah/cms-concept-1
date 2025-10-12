<?php

namespace router;

class Comments {

  private function get($id, $contentType, $contentId): array {
    $comments = new \model\Comments;

    if ($id) {
      return $comments -> getDetail($id, $contentType, $contentId);
    } else {
      return $comments -> getList($contentType, $contentId);
    }

  }

  public function resolve($env, $method, $url, $data): array {
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

}
