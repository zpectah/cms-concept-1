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
            $settings = new \model\Settings;

            $response = $settings -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'articles':
            $articles = new \model\Articles;

            $response = $articles -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'tags':
            $tags = new \model\Tags;

            $response = $tags -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'categories':
            $categories = new \model\Categories;

            $response = $categories -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'attachments':
            $attachments = new \model\Attachments;

            $response = $attachments -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'pages':
            $pages = new \model\Pages;

            $response = $pages -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'users':
            $users = new \model\Users;

            $response = $users -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'members':
            $members = new \model\Members;

            $response = $members -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'menu':
            $menu = new \model\Menu;

            $response = $menu -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'menuitems':
            $menuItems = new \model\MenuItems;

            $response = $menuItems -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'messages':
            $messages = new \model\Messages;

            $response = $messages -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'translations':
            $translations = new \model\Translations;

            $response = $translations -> process($environment, $method, $parsed_url, $jsonData);
            break;

          case 'comments':
            $comments = new \model\Comments;

            $response = $comments -> process($environment, $method, $parsed_url, $jsonData);
            break;

          default:
            $response = [];
            break;

        }

        return $response;
    }

}
