<?php

namespace model;

class Articles extends Model {

  public function getList(): array {
    $articles = [];

    for ($i = 1; $i <= 25; $i++) {
      $isEven = $i % 2;
      $articles[] = [
        'id' => $i,
        'name' => "article-name-$i",
        'type' => $isEven ? 'default' : 'event',
//                'locale' => [
//                  'en' => [
//                    'title' => "Article title EN $i",
//                    'description' => "Article description EN $i",
//                    'content' => "Article content EN $i",
//                  ],
//                  'cs' => [
//                    'title' => "Article title CS $i",
//                    'description' => "Article description CS $i",
//                    'content' => "Article content CS $i",
//                  ],
//                ],
        'startDate' => $this -> getNow(),
        'endDate' => $this -> getNow(),

        'categories' => $isEven ? [1,2] : [3,4],
        'tags' => $isEven ? [2,3] : [4,5],
        'attachments' => $isEven ? [3,4] : [5,6,7],
        'active' => $isEven,
        'deleted' => false,
        'created' => $this -> getNow(),
        'updated' => $this -> getNow(),
      ];
    }

    return [
      ...$articles,
    ];
  }

  public function getDetail($id): array {
    $isEven = $id % 2;

    return [
      'id' => $id,
      'name' => 'article-name-' . $id,
      'type' => $isEven ? 'default' : 'event',
      'locale' => [
        'en' => [
          'title' => "Article title EN $id",
          'description' => "Article description EN $id",
          'content' => "Article content EN $id",
        ],
        'cs' => [
          'title' => "Article title CS $id",
          'description' => "Article description CS $id",
          'content' => "Article content CS $id",
        ],
      ],

      'startDate' => $this -> getNow(),
      'endDate' => $this -> getNow(),
      'gpsLocation' => [0,0],
      'eventAddress' => [
        'street' => 'Street',
        'streetNo' => '125/15B',
        'district' => 'District',
        'city' => 'My City',
        'country' => 'My Country',
        'zip' => '555248',
      ],

      'categories' => [1,2],
      'tags' => [2,3],
      'attachments' => [3,4],
      'active' => true,
      'deleted' => false,
      'created' => $this -> getNow(),
      'updated' => $this -> getNow(),
    ];
  }

}
