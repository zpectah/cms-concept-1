<?php

namespace router;

class SettingsRouter extends Router {
  public function resolve($env, $method, $url, $data): array {
    $settings = new \model\Settings;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_get:
            $response = $settings -> getTable();
            break;

          case self::method_patch:
            switch ($url['a']) {

              case 'patch':
                $response = $settings -> patch($data);
                break;

              case 'locale-install':
                $response = $settings -> localeInstall($data);
                break;

              case 'locale-toggle':
                $response = $settings -> localeToggle($data);
                break;

              case 'locale-default':
                $response = $settings -> localeDefault($data);
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
