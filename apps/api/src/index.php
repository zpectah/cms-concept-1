<?php

const PATH_ROOT = __DIR__ . '/';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // TODO: resolve on production
  header("Access-Control-Allow-Origin: http://localhost:4200");
  header('Access-Control-Allow-Methods: GET, DELETE, PUT, PATCH, UPDATE, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Content-Encoding');
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Max-Age: 1728000');
  header('Content-Length: 0');
  header('Content-Type: text/plain');
  die();
}

// TODO: resolve on production
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, DELETE, PUT, PATCH, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Credentials, Content-Type, Content-Encoding');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if (isset($_SERVER['HTTP_CONTENT_ENCODING']) && $_SERVER['HTTP_CONTENT_ENCODING'] === 'gzip') {
  header('Content-Encoding: gzip');
}

require PATH_ROOT . 'env.php';
require PATH_ROOT . 'libs.php';

$response = new Response();

print_r(
  json_encode(
    $response -> resolveRequest(),
    JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
  )
);

