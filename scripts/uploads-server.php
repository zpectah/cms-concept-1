<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS"); // Přidána OPTIONS
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$requested_uri = $_SERVER['REQUEST_URI'];

$relative_path = ltrim($requested_uri, '/');

$full_path = realpath(__DIR__ . '/../dist/uploads/' . $relative_path);

$uploads_dir = realpath(__DIR__ . '/../dist/uploads');

if ($full_path && str_starts_with($full_path, $uploads_dir) && is_file($full_path)) {
  $finfo = finfo_open(FILEINFO_MIME_TYPE);
  if ($finfo) {
    $mime_type = finfo_file($finfo, $full_path);
    finfo_close($finfo);
  } else {
    $mime_type = 'application/octet-stream';
  }

  header("Content-Type: {$mime_type}");
  header("Content-Length: " . filesize($full_path));
  readfile($full_path);
  exit();
}

http_response_code(404);
echo "File not found or access denied.";
exit();
