<?php

namespace router;

class Attachments extends Router {
  public function resolve($env, $method, $url, $data): array {
    $attachments = new \model\Attachments;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            if (self::isIdValidParameter($url)) {
              $id = $url['b'];

              $response = $attachments -> getDetail($id);
            } else {
              $response = $attachments -> getList();
            }
            break;

          case self::method_post:
            switch ($url['a']) {

              case 'file-create':
                $response = $attachments -> fileCreate($data);
                break;

              case 'create':
                $response = $attachments -> create($data);
                break;

            }
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $attachments -> patch($data);
                break;

              case 'toggle':
                $response = $attachments -> toggle($data);
                break;

              case 'delete':
                $response = $attachments -> delete($data);
                break;

            }
            break;

        }
        break;

      case self::env_public:
        $response = [];
        break;

      default:
        http_response_code(200);
        $response = [];
        break;
    }

    return $response;
  }

}
