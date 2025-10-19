<?php

namespace model;

class MenuItems extends Model {

  public function getList($menuId): array {
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
        'parent_id' => 0,
        'menu_id' => $menuId ?? 0,
        'active' => true,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$menuItems,
    ];
  }

  public function getDetail($id, $menuId): array {
    $isEven = $id % 2;

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
      'parent_id' => 0,
      'menu_id' => $menuId ?? 0,
      'active' => true,
      'deleted' => false,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

  public function create($data): array {
    // TODO: create new item in table

    return [
      'toCreate' => $data,
    ];
  }

  public function patch($data): array {
    // TODO: patch item in table

    return [
      'toPatch' => $data,
    ];
  }

  public function toggle($data): array {

    return [
      'toToggle' => $data,
    ];
  }

  public function delete($data): array {

    return [
      'toDelete' => $data,
    ];
  }

}
