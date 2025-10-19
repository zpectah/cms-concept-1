<?php

namespace service;

class MaintenanceService {

  public function analyzeModelItemsToDelete(): array {

    return [
      'articles' => [1,2,3],
      'attachments' => [4,5],
      'categories' => [6],
      'members' => [1,3,5],
      'menu' => [2,4,5],
      'menuItems' => [3,4,5],
      'pages' => [],
      'tags' => [5,6,7],
      'translations' => [2,3,5,6],
      'users' => [2,3,5],
    ];
  }

  public function deletePermanentlyModelItems($data): array {

    return [
      'articles' => 3,
      'attachments' => 2,
      'categories' => 1,
      'members' => 3,
      'menu' => 3,
      'menuItems' => 3,
      'pages' => 0,
      'tags' => 3,
      'translations' => 4,
      'users' => 3,
    ];
  }

}
