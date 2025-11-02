<?php

namespace service;

use model\Articles;
use model\Attachments;
use model\Blacklist;
use model\Categories;
use model\Comments;
use model\Members;
use model\Menu;
use model\MenuItems;
use model\Messages;
use model\Pages;
use model\Requests;
use model\Tags;
use model\Translations;
use model\Users;

class MaintenanceService {

  public function analyzeModelItemsToDelete(): array {
    $articles = new Articles;
    $attachments = new Attachments;
    $blacklist = new Blacklist;
    $categories = new Categories;
    $comments = new Comments;
    $members = new Members;
    $menu = new Menu;
    $menuItems = new MenuItems;
    $messages = new Messages;
    $pages = new Pages;
    $requests = new Requests;
    $tags = new Tags;
    $translations = new Translations;
    $users = new Users;

    return [
      'articles' => $articles -> analyzeToDelete(),
      'attachments' => $attachments -> analyzeToDelete(),
      'blacklist' => $blacklist -> analyzeToDelete(),
      'categories' => $categories -> analyzeToDelete(),
      'comments' => $comments -> analyzeToDelete(),
      'members' => $members -> analyzeToDelete(),
      'menu' => $menu -> analyzeToDelete(),
      'menuItems' => $menuItems -> analyzeToDelete(),
      'messages' => $messages -> analyzeToDelete(),
      'pages' => $pages -> analyzeToDelete(),
      'requests' => $requests -> analyzeToDelete(),
      'tags' => $tags -> analyzeToDelete(),
      'translations' => $translations -> analyzeToDelete(),
      'users' => $users -> analyzeToDelete(),
    ];
  }

  public function deletePermanentlyModelItems($data, $locales): array {
    $articles = new Articles;
    $attachments = new Attachments;
    $blacklist = new Blacklist;
    $categories = new Categories;
    $comments = new Comments;
    $members = new Members;
    $menu = new Menu;
    $menuItems = new MenuItems;
    $messages = new Messages;
    $pages = new Pages;
    $requests = new Requests;
    $tags = new Tags;
    $translations = new Translations;
    $users = new Users;

    $results = $data['results'];
    $options = $data['options'];
    $uploadsPath = $options['uploadsPath'];

    return [
      'articles' => $articles -> deletePermanently($results['articles'], $locales),
      'attachments' => $attachments -> deletePermanently($results['attachments'], $uploadsPath),
      'blacklist' =>  $blacklist -> deletePermanently($results['blacklist']),
      'categories' => $categories -> deletePermanently($results['categories'], $locales),
      'comments' => $comments -> deletePermanently($results['comments']),
      'members' => $members -> deletePermanently($results['members']),
      'menu' => $menu -> deletePermanently($results['menu']),
      'menuItems' => $menuItems -> deletePermanently($results['menuItems'], $locales),
      'messages' => $messages -> deletePermanently($results['messages']),
      'pages' => $pages -> deletePermanently($results['pages'], $locales),
      'requests' => $requests -> deletePermanently($results['requests']),
      'tags' => $tags -> deletePermanently($results['tags']),
      'translations' => $translations -> deletePermanently($results['translations'], $locales),
      'users' => $users -> deletePermanently($results['users']),
    ];
  }

}
