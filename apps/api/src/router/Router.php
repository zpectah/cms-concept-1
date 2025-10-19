<?php

namespace router;

class Router {
  public function __construct() {}

  protected const env_private = 'private';
  protected const env_public = 'public';

  protected const method_get = 'GET';
  protected const method_post = 'POST';
  protected const method_patch = 'PATCH';

  protected function isTwoParameterValid($url): bool {
    return $url['a'] && $url['b'];
  }

  protected function isIdValidParameter($url): bool {
    return $url['a'] === 'id' && $url['b'] && is_numeric($url['b']);
  }

  protected function isEmailValidParameter($url): bool {
    return $url['a'] === 'email' && $url['b'] && filter_var($url['b'], FILTER_VALIDATE_EMAIL);
  }

  protected function isMenuIdValidParameter($url): bool {
    return $url['a'] === 'menu' && $url['b'] && is_numeric($url['b']);
  }

  protected function isTokenValidParameter($url): bool {
    return $url['a'] === 'token' && $url['b'];
  }


  // TODO: common methods across routing

}
