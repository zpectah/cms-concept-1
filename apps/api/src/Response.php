<?php

class Response {

  private function getParsedUrl(): array {
    $url = $_SERVER['REQUEST_URI'] ?? '';
    $url_parsed = parse_url($url);
    $url_path = $url_parsed['path'] ?? '';
    $url_attributes = array_values(array_filter(explode('/', $url_path)));
    $url_query = [];
    $method = $_SERVER['REQUEST_METHOD'];

    if (!empty($url_parsed['query'])) {
      parse_str($url_parsed['query'], $url_query);
    }

    return [
      'method' => $method,
      'url' => $url,
      'query' => $url_query,
      'env' => $url_attributes[0] ?? null,
      'model' => $url_attributes[1] ?? null,
      'a' => $url_attributes[2] ?? null,
      'b' => $url_attributes[3] ?? null,
      'c' => $url_attributes[4] ?? null,
      'd' => $url_attributes[5] ?? null,
      'e' => $url_attributes[6] ?? null,
      // TODO: if needed
    ];
  }

  public function resolveRequest(): array {
    $parsed_url = $this -> getParsedUrl();
    $environment = $parsed_url['env'];
    $model = $parsed_url['model'];
    $method = $parsed_url['method'];

    // JSON data
    $rawJsonData = file_get_contents("php://input");
    $jsonData = json_decode($rawJsonData, true);

    switch ($model) {

      case 'settings':
        $settings = new router\SettingsRouter;

        $response = $settings -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'articles':
        $articles = new router\ArticlesRouter;

        $response = $articles -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'tags':
        $tags = new router\TagsRouter;

        $response = $tags -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'categories':
        $categories = new router\CategoriesRouter;

        $response = $categories -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'attachments':
        $attachments = new router\AttachmentsRouter;

        $response = $attachments -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'pages':
        $pages = new router\PagesRouter;

        $response = $pages -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'users':
        $users = new router\UsersRouter;

        $response = $users -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'members':
        $members = new router\MembersRouter;

        $response = $members -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'menu':
        $menu = new router\MenuRouter;

        $response = $menu -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'menuitems':
        $menuItems = new router\MenuItemsRouter;

        $response = $menuItems -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'messages':
        $messages = new router\MessagesRouter;

        $response = $messages -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'translations':
        $translations = new router\TranslationsRouter;

        $response = $translations -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'comments':
        $comments = new router\CommentsRouter;

        $response = $comments -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'blacklist':
        $blacklist = new router\BlacklistRouter;

        $response = $blacklist -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'requests':
        $requests = new router\RequestsRouter;

        $response = $requests -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      case 'maintenance':
        $maintenance = new router\MaintenanceRouter;

        $response = $maintenance -> resolve($environment, $method, $parsed_url, $jsonData);
        break;

      default:
        $response = [];
        break;

    }

    return $response;
  }

}
