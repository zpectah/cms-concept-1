<?php

const PATH_ROOT = __DIR__ . '/';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, DELETE, PUT, PATCH, UPDATE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Content-Encoding');
  header('Access-Control-Max-Age: 1728000');
  header('Content-Length: 0');
  header('Content-Type: text/plain');
  die();
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Credentials, Content-Type, Content-Encoding');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if (isset($_SERVER['HTTP_CONTENT_ENCODING']) && $_SERVER['HTTP_CONTENT_ENCODING'] === 'gzip') {
  header('Content-Encoding: gzip');
}

require PATH_ROOT . 'env.php';
require PATH_ROOT . 'libs.php';

use router\Router;

$router = new Router();

print_r(
  json_encode(
    $router -> resolveRequest(),
    JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
  )
);

