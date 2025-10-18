# RestApi

## Private

### Articles

|  Method  | Model               |     Request      |     Response      |
|:--------:|:--------------------|:----------------:|:-----------------:|
|   GET    | `/articles`         |        ``        |    `Articles`     |
|   GET    | `/articles/id/$id`  |        ``        | `ArticlesDetail`  |
|   POST   | `/articles/create`  | `ArticlesDetail` |       `{}`        |
|  PATCH   | `/articles/patch`   | `ArticlesDetail` |       `{}`        |
|  PATCH   | `/articles/toggle`  |    `number[]`    |       `{}`        |
|  PATCH   | `/articles/delete`  |    `number[]`    |       `{}`        |

* $id = Item ID

### Attachments

|  Method  | Model                 |       Request       |      Response       |
|:--------:|:----------------------|:-------------------:|:-------------------:|
|   GET    | `/attachments`        |         ``          |    `Attachments`    |
|   GET    | `/attachments/id/$id` |         ``          | `AttachmentsDetail` |
|   POST   | `/attachments/create` | `AttachmentsDetail` |        `{}`         |
|  PATCH   | `/attachments/patch`  | `AttachmentsDetail` |        `{}`         |
|  PATCH   | `/attachments/toggle` |     `number[]`      |        `{}`         |
|  PATCH   | `/attachments/delete` |     `number[]`      |        `{}`         |

* $id = Item ID

### Categories

|  Method  | Model                |       Request       |      Response       |
|:--------:|:---------------------|:-------------------:|:-------------------:|
|   GET    | `/categories`        |         ``          |    `Categories`     |
|   GET    | `/categories/id/$id` |         ``          | `CategoriesDetail`  |
|   POST   | `/categories/create` | `CategoriesDetail`  |        `{}`         |
|  PATCH   | `/categories/patch`  | `CategoriesDetail`  |        `{}`         |
|  PATCH   | `/categories/toggle` |     `number[]`      |        `{}`         |
|  PATCH   | `/categories/delete` |     `number[]`      |        `{}`         |

* $id = Item ID

### Comments

|  Method  | Model                               |     Request      |     Response     |
|:--------:|:------------------------------------|:----------------:|:----------------:|
|   GET    | `/comments`                         |        ``        |    `Comments`    |
|   GET    | `/comments/id/$id`                  |        ``        | `CommentsDetail` |
|   GET    | `/comments/$contentType/$contentId` |        ``        | `CommentsDetail` |
|   POST   | `/comments/create`                  | `CommentsDetail` |       `{}`       |
|  PATCH   | `/comments/patch`                   | `CommentsDetail` |       `{}`       |
|  PATCH   | `/comments/toggle`                  |    `number[]`    |       `{}`       |
|  PATCH   | `/comments/delete`                  |    `number[]`    |       `{}`       |

* $id = Item ID
* $contentType = Content model type
* $contentId = Id of content by type


### Members

|  Method  | Model                   |     Request     |    Response     |
|:--------:|:------------------------|:---------------:|:---------------:|
|   GET    | `/members`              |       ``        |    `Members`    |
|   GET    | `/members/id/$id`       |       ``        | `MembersDetail` |
|   GET    | `/members/email/$email` |       ``        | `MembersDetail` |
|   POST   | `/members/create`       | `MembersDetail` |      `{}`       |
|  PATCH   | `/members/patch`        | `MembersDetail` |      `{}`       |
|  PATCH   | `/members/toggle`       |   `number[]`    |      `{}`       |
|  PATCH   | `/members/delete`       |   `number[]`    |      `{}`       |

* $id = Item ID
* $email = Member email


### Menu

|  Method  | Model          |   Request    |   Response   |
|:--------:|:---------------|:------------:|:------------:|
|   GET    | `/menu`        |      ``      |    `Menu`    |
|   GET    | `/menu/id/$id` |      ``      | `MenuDetail` |
|   POST   | `/menu/create` | `MenuDetail` |     `{}`     |
|  PATCH   | `/menu/patch`  | `MenuDetail` |     `{}`     |
|  PATCH   | `/menu/toggle` |  `number[]`  |     `{}`     |
|  PATCH   | `/menu/delete` |  `number[]`  |     `{}`     |

* $id = Item ID


### MenuItems

|  Method  | Model                     |      Request      |     Response      |
|:--------:|:--------------------------|:-----------------:|:-----------------:|
|   GET    | `/menuitems`              |        ``         |    `MenuItems`    |
|   GET    | `/menuitems/id/$id`       |        ``         | `MenuItemsDetail` |
|   GET    | `/menuitems/menu/$menuId` |        ``         | `MenuItemsDetail` |
|   POST   | `/menuitems/create`       | `MenuItemsDetail` |       `{}`        |
|  PATCH   | `/menuitems/patch`        | `MenuItemsDetail` |       `{}`        |
|  PATCH   | `/menuitems/toggle`       |    `number[]`     |       `{}`        |
|  PATCH   | `/menuitems/delete`       |    `number[]`     |       `{}`        |

* $id = Item ID
* $menuId = Parent menu id


## Messages

|  Method  | Model              |     Request      |     Response     |
|:--------:|:-------------------|:----------------:|:----------------:|
|   GET    | `/messages`        |        ``        |    `Messages`    |
|   GET    | `/messages/id/$id` |        ``        | `MessagesDetail` |
|   POST   | `/messages/create` | `MessagesDetail` |       `{}`       |
|  PATCH   | `/messages/patch`  | `MessagesDetail` |       `{}`       |
|  PATCH   | `/messages/toggle` |    `number[]`    |       `{}`       |
|  PATCH   | `/messages/delete` |    `number[]`    |       `{}`       |
|  PATCH   | `/messages/read`   |    `number[]`    |       `{}`       |

* $id = Item ID


### Pages

|  Method  | Model               |    Request    |   Response    |
|:--------:|:--------------------|:-------------:|:-------------:|
|   GET    | `/pages`            |      ``       |    `Pages`    |
|   GET    | `/pages/id/$id`     |      ``       | `PagesDetail` |
|   POST   | `/pages/create`     | `PagesDetail` |     `{}`      |
|  PATCH   | `/pages/patch`      | `PagesDetail` |     `{}`      |
|  PATCH   | `/pages/toggle`     |  `number[]`   |     `{}`      |
|  PATCH   | `/pages/delete`     |  `number[]`   |     `{}`      |

* $id = Item ID


### Tags

|  Method  | Model               |   Request    |   Response   |
|:--------:|:--------------------|:------------:|:------------:|
|   GET    | `/tags`             |      ``      |    `Tags`    |
|   GET    | `/tags/id/$id`      |      ``      | `TagsDetail` |
|   POST   | `/tags/create`      | `TagsDetail` |     `{}`     |
|  PATCH   | `/tags/patch`       | `TagsDetail` |     `{}`     |
|  PATCH   | `/tags/toggle`      |  `number[]`  |     `{}`     |
|  PATCH   | `/tags/delete`      |  `number[]`  |     `{}`     |

* $id = Item ID


### Translations

|  Method  | Model                  |       Request        |       Response       |
|:--------:|:-----------------------|:--------------------:|:--------------------:|
|   GET    | `/translations`        |          ``          |    `Translations`    |
|   GET    | `/translations/id/$id` |          ``          | `TranslationsDetail` |
|   POST   | `/translations/create` | `TranslationsDetail` |         `{}`         |
|  PATCH   | `/translations/patch`  | `TranslationsDetail` |         `{}`         |
|  PATCH   | `/translations/toggle` |      `number[]`      |         `{}`         |
|  PATCH   | `/translations/delete` |      `number[]`      |         `{}`         |

* $id = Item ID


### Users

|  Method  | Model                 |    Request    |   Response    |
|:--------:|:----------------------|:-------------:|:-------------:|
|   GET    | `/users`              |      ``       |    `Users`    |
|   GET    | `/users/id/$id`       |      ``       | `UsersDetail` |
|   GET    | `/users/email/$email` |      ``       | `UsersDetail` |
|   POST   | `/users/create`       | `UsersDetail` |     `{}`      |
|  PATCH   | `/users/patch`        | `UsersDetail` |     `{}`      |
|  PATCH   | `/users/toggle`       |  `number[]`   |     `{}`      |
|  PATCH   | `/users/delete`       |  `number[]`   |     `{}`      |

* $id = Item ID
* $email = User email


### Blacklist

|  Method  | Model               |     Request     |    Response     |
|:--------:|:--------------------|:---------------:|:---------------:|
|   GET    | `/blacklist`        |       ``        |   `Blacklist`   |
|   GET    | `/blacklist/id/$id` |       ``        | `BlacklistItem` |
|   POST   | `/blacklist/create` | `BlacklistItem` |      `{}`       |
|  PATCH   | `/blacklist/patch`  | `BlacklistItem` |      `{}`       |
|  PATCH   | `/blacklist/toggle` |   `number[]`    |      `{}`       |
|  PATCH   | `/blacklist/delete` |   `number[]`    |      `{}`       |

* $id = Item ID


### Requests

|  Method  | Model                    |    Request     |    Response    |
|:--------:|:-------------------------|:--------------:|:--------------:|
|   GET    | `/requests`              |       ``       |   `Requests`   |
|   GET    | `/requests/id/$id`       |       ``       | `RequestsItem` |
|   GET    | `/requests/token/$token` |       ``       | `RequestsItem` |
|   POST   | `/requests/create`       | `RequestsItem` |      `{}`      |
|  PATCH   | `/requests/patch`        | `RequestsItem` |      `{}`      |
|  PATCH   | `/requests/toggle`       |   `number[]`   |      `{}`      |
|  PATCH   | `/requests/delete`       |   `number[]`   |      `{}`      |

* $id = Item ID
* $token = request token


### Settings

|  Method   | Model                      |       Request        |  Response  |
|:---------:|:---------------------------|:--------------------:|:----------:|
|    GET    | `/settings`                |          ``          | `Settings` |
|   PATCH   | `/settings/patch`          | `Partial<Settings>`  |    `{}`    |
|   PATCH   | `/settings/locale-install` | `{ locale: string }` |    `{}`    |
|   PATCH   | `/settings/locale-default` | `{ locale: string }` |    `{}`    |
|   PATCH   | `/settings/locale-toggle`  | `{ locale: string }` |    `{}`    |


## Public
