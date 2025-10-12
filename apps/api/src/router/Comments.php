<?php

namespace router;

class Comments extends Router {
  public function resolve($env, $method, $url, $data): array {
    $comments = new \model\Comments;

    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          if (self::isTwoParameterValid($url)) {
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $comments -> getDetail($id, null, null);
            } else {
              $contentType = $url['a'];
              $contentId = $url['b'];

              $response = $comments -> getList($contentType, $contentId);
            }
          }
          break;

        case 'PATCH':
        case 'POST':
          $response = [
            'request' => $data,
          ];
          break;

      }
    } else if ($env === 'public') {
      $response = [];
    }

    // TODO
    http_response_code(200);

    return $response;
  }

}
