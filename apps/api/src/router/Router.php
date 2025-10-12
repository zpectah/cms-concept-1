<?php

namespace router;

class Router {

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
            $settings = new Settings;

            $response = $settings -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'articles':
            $articles = new Articles;

            $response = $articles -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'tags':
            $tags = new Tags;

            $response = $tags -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'categories':
            $categories = new Categories;

            $response = $categories -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'attachments':
            $attachments = new Attachments;

            $response = $attachments -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'pages':
            $pages = new Pages;

            $response = $pages -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'users':
            $users = new Users;

            $response = $users -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'members':
            $members = new Members;

            $response = $members -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'menu':
            $menu = new Menu;

            $response = $menu -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'menuitems':
            $menuItems = new MenuItems;

            $response = $menuItems -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'messages':
            $messages = new Messages;

            $response = $messages -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'translations':
            $translations = new Translations;

            $response = $translations -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'comments':
            $comments = new Comments;

            $response = $comments -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'blacklist':
            $blacklist = new Blacklist;

            $response = $blacklist -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          case 'requests':
            $requests = new Requests;

            $response = $requests -> resolve($environment, $method, $parsed_url, $jsonData);
            break;

          default:
            $response = [];
            break;

        }

        return $response;
    }

}
