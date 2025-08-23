<?php

namespace model;

class MenuItems {

  public function process($env, $method, $url, $data): array {
    $response = [];

    if ($env === 'private') {
      switch ($method) {

        case 'GET':
          $id = $url['a'];
          $response = $this -> get($id);
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

  public function get($id): array {
    $now = date('c'); // ISO 8601 format

    if ($id) {
      // Mock detail
      return [
        'id' => $id,
        'name' => 'menu-item-name-' . $id,
        'type' => 'default',
        'locale' => [
          'en' => [
            'label' => "Menu item label EN $id",
          ],
          'cs' => [
            'label' => "Menu item label CS $id",
          ],
        ],
        'parent' => 1,
        'menu' => 1,
        'active' => true,
        'deleted' => false,
        'created' => $now,
        'updated' => $now,
      ];
    } else {
      // Mock list
      $menuItems = [];

      for ($i = 1; $i <= 10; $i++) {
        $menuItems[] = [
          'id' => $i,
          'name' => "menu-item-name-$i",
          'type' => 'default',
//          'locale' => [
//            'en' => [
//              'label' => "Menu item label EN $id",
//            ],
//            'cs' => [
//              'label' => "Menu item label CS $id",
//            ],
//          ],
          'parent' => 1,
          'menu' => 1,
          'active' => true,
          'deleted' => false,
          'created' => $now,
          'updated' => $now,
        ];
      }

      return [
        ...$menuItems,
      ];
    }
  }

}
