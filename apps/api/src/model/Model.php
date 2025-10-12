<?php

namespace model;

class Model {

  public function __construct() {}

  public function getNow(): string {
    return date('c'); // ISO 8601 format
  }

}
