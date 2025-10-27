# Api Docs

## Private

### Articles

|  Method  | Model               |     Request      |               Response                |
|:--------:|:--------------------|:----------------:|:-------------------------------------:|
|   GET    | `/articles`         |        ``        |              `Articles`               |
|   GET    | `/articles/id/$id`  |        ``        |           `ArticlesDetail`            |
|   POST   | `/articles/create`  | `ArticlesDetail` |  `{ id: number; locales: string[] }`  |
|  PATCH   | `/articles/patch`   | `ArticlesDetail` | `{ rows: number; locales: string[] }` |
|  PATCH   | `/articles/toggle`  |    `number[]`    |          `{ rows: number }`           |
|  PATCH   | `/articles/delete`  |    `number[]`    |          `{ rows: number }`           |

* $id = Item ID

### Attachments

|  Method  | Model                      |              Request               |      Response       |
|:--------:|:---------------------------|:----------------------------------:|:-------------------:|
|   GET    | `/attachments`             |                 ``                 |    `Attachments`    |
|   GET    | `/attachments/id/$id`      |                 ``                 | `AttachmentsDetail` |
|   GET    | `/attachments/name/$name`  |                 ``                 | `AttachmentsDetail` |
|   POST   | `/attachments/file-create` |    `FileUploaderTransportQueue`    |     `number[]`      |
|   POST   | `/attachments/create`      | `FileUploaderTransportQueueItem[]` | `{ id: number[] }`  |
|  PATCH   | `/attachments/patch`       |        `AttachmentsDetail`         | `{ rows: number }`  |
|  PATCH   | `/attachments/toggle`      |             `number[]`             | `{ rows: number }`  |
|  PATCH   | `/attachments/delete`      |             `number[]`             | `{ rows: number }`  |

* $id = Item ID
* $name = Item name

### Categories

|  Method  | Model                |       Request       |               Response                |
|:--------:|:---------------------|:-------------------:|:-------------------------------------:|
|   GET    | `/categories`        |         ``          |             `Categories`              |
|   GET    | `/categories/id/$id` |         ``          |          `CategoriesDetail`           |
|   POST   | `/categories/create` | `CategoriesDetail`  |  `{ id: number; locales: string[] }`  |
|  PATCH   | `/categories/patch`  | `CategoriesDetail`  | `{ rows: number; locales: string[] }` |
|  PATCH   | `/categories/toggle` |     `number[]`      |          `{ rows: number }`           |
|  PATCH   | `/categories/delete` |     `number[]`      |          `{ rows: number }`           |

* $id = Item ID

### Comments

|  Method  | Model                               |     Request      |      Response      |
|:--------:|:------------------------------------|:----------------:|:------------------:|
|   GET    | `/comments`                         |        ``        |     `Comments`     |
|   GET    | `/comments/id/$id`                  |        ``        |  `CommentsDetail`  |
|   GET    | `/comments/$contentType/$contentId` |        ``        |  `CommentsDetail`  |
|   POST   | `/comments/create`                  | `CommentsDetail` |  `{ id: number }`  |
|  PATCH   | `/comments/patch`                   | `CommentsDetail` | `{ rows: number }` |
|  PATCH   | `/comments/toggle`                  |    `number[]`    | `{ rows: number }` |
|  PATCH   | `/comments/delete`                  |    `number[]`    | `{ rows: number }` |

* $id = Item ID
* $contentType = Content model type
* $contentId = Id of content by type


### Members

|  Method  | Model                   |     Request     |      Response      |
|:--------:|:------------------------|:---------------:|:------------------:|
|   GET    | `/members`              |       ``        |     `Members`      |
|   GET    | `/members/id/$id`       |       ``        |  `MembersDetail`   |
|   GET    | `/members/email/$email` |       ``        |  `MembersDetail`   |
|   POST   | `/members/create`       | `MembersDetail` |  `{ id: number }`  |
|  PATCH   | `/members/patch`        | `MembersDetail` | `{ rows: number }` |
|  PATCH   | `/members/toggle`       |   `number[]`    | `{ rows: number }` |
|  PATCH   | `/members/delete`       |   `number[]`    | `{ rows: number }` |

* $id = Item ID
* $email = Member email


### Menu

|  Method  | Model          |   Request    |      Response      |
|:--------:|:---------------|:------------:|:------------------:|
|   GET    | `/menu`        |      ``      |       `Menu`       |
|   GET    | `/menu/id/$id` |      ``      |    `MenuDetail`    |
|   POST   | `/menu/create` | `MenuDetail` |  `{ id: number }`  |
|  PATCH   | `/menu/patch`  | `MenuDetail` | `{ rows: number }` |
|  PATCH   | `/menu/toggle` |  `number[]`  | `{ rows: number }` |
|  PATCH   | `/menu/delete` |  `number[]`  | `{ rows: number }` |

* $id = Item ID


### MenuItems

|  Method  | Model                     |      Request      |               Response                |
|:--------:|:--------------------------|:-----------------:|:-------------------------------------:|
|   GET    | `/menuitems`              |        ``         |              `MenuItems`              |
|   GET    | `/menuitems/id/$id`       |        ``         |           `MenuItemsDetail`           |
|   GET    | `/menuitems/menu/$menuId` |        ``         |           `MenuItemsDetail`           |
|   POST   | `/menuitems/create`       | `MenuItemsDetail` |  `{ id: number; locales: string[] }`  |
|  PATCH   | `/menuitems/patch`        | `MenuItemsDetail` | `{ rows: number; locales: string[] }` |
|  PATCH   | `/menuitems/toggle`       |    `number[]`     |          `{ rows: number }`           |
|  PATCH   | `/menuitems/delete`       |    `number[]`     |          `{ rows: number }`           |

* $id = Item ID
* $menuId = Parent menu id


### Messages

|  Method  | Model              |     Request      |      Response      |
|:--------:|:-------------------|:----------------:|:------------------:|
|   GET    | `/messages`        |        ``        |     `Messages`     |
|   GET    | `/messages/id/$id` |        ``        |  `MessagesDetail`  |
|   POST   | `/messages/create` | `MessagesDetail` |  `{ id: number }`  |
|  PATCH   | `/messages/patch`  | `MessagesDetail` | `{ rows: number }` |
|  PATCH   | `/messages/toggle` |    `number[]`    | `{ rows: number }` |
|  PATCH   | `/messages/delete` |    `number[]`    | `{ rows: number }` |
|  PATCH   | `/messages/read`   |    `number[]`    | `{ rows: number }` |

* $id = Item ID


### Pages

|  Method  | Model               |    Request    |               Response                |
|:--------:|:--------------------|:-------------:|:-------------------------------------:|
|   GET    | `/pages`            |      ``       |                `Pages`                |
|   GET    | `/pages/id/$id`     |      ``       |             `PagesDetail`             |
|   POST   | `/pages/create`     | `PagesDetail` |  `{ id: number; locales: string[] }`  |
|  PATCH   | `/pages/patch`      | `PagesDetail` | `{ rows: number; locales: string[] }` |
|  PATCH   | `/pages/toggle`     |  `number[]`   |          `{ rows: number }`           |
|  PATCH   | `/pages/delete`     |  `number[]`   |          `{ rows: number }`           |

* $id = Item ID


### Tags

|  Method  | Model               |   Request    |      Response      |
|:--------:|:--------------------|:------------:|:------------------:|
|   GET    | `/tags`             |      ``      |       `Tags`       |
|   GET    | `/tags/id/$id`      |      ``      |    `TagsDetail`    |
|   POST   | `/tags/create`      | `TagsDetail` |  `{ id: number }`  |
|  PATCH   | `/tags/patch`       | `TagsDetail` | `{ rows: number }` |
|  PATCH   | `/tags/toggle`      |  `number[]`  | `{ rows: number }` |
|  PATCH   | `/tags/delete`      |  `number[]`  | `{ rows: number }` |

* $id = Item ID


### Translations

|  Method  | Model                  |       Request        |               Response                |
|:--------:|:-----------------------|:--------------------:|:-------------------------------------:|
|   GET    | `/translations`        |          ``          |            `Translations`             |
|   GET    | `/translations/id/$id` |          ``          |         `TranslationsDetail`          |
|   POST   | `/translations/create` | `TranslationsDetail` |  `{ id: number; locales: string[] }`  |
|  PATCH   | `/translations/patch`  | `TranslationsDetail` | `{ rows: number; locales: string[] }` |
|  PATCH   | `/translations/toggle` |      `number[]`      |          `{ rows: number }`           |
|  PATCH   | `/translations/delete` |      `number[]`      |          `{ rows: number }`           |

* $id = Item ID


### Users

|  Method  | Model                 |    Request    |      Response      |
|:--------:|:----------------------|:-------------:|:------------------:|
|   GET    | `/users`              |      ``       |      `Users`       |
|   GET    | `/users/id/$id`       |      ``       |   `UsersDetail`    |
|   GET    | `/users/email/$email` |      ``       |   `UsersDetail`    |
|   POST   | `/users/create`       | `UsersDetail` |  `{ id: number }`  |
|  PATCH   | `/users/patch`        | `UsersDetail` | `{ rows: number }` |
|  PATCH   | `/users/toggle`       |  `number[]`   | `{ rows: number }` |
|  PATCH   | `/users/delete`       |  `number[]`   | `{ rows: number }` |

* $id = Item ID
* $email = User email


### Blacklist

|  Method  | Model               |     Request     |      Response      |
|:--------:|:--------------------|:---------------:|:------------------:|
|   GET    | `/blacklist`        |       ``        |    `Blacklist`     |
|   GET    | `/blacklist/id/$id` |       ``        |  `BlacklistItem`   |
|   POST   | `/blacklist/create` | `BlacklistItem` |  `{ id: number }`  |
|  PATCH   | `/blacklist/patch`  | `BlacklistItem` | `{ rows: number }` |
|  PATCH   | `/blacklist/toggle` |   `number[]`    | `{ rows: number }` |
|  PATCH   | `/blacklist/delete` |   `number[]`    | `{ rows: number }` |

* $id = Item ID


### Requests

|  Method  | Model                    |    Request     |      Response      |
|:--------:|:-------------------------|:--------------:|:------------------:|
|   GET    | `/requests`              |       ``       |     `Requests`     |
|   GET    | `/requests/id/$id`       |       ``       |   `RequestsItem`   |
|   GET    | `/requests/token/$token` |       ``       |   `RequestsItem`   |
|   POST   | `/requests/create`       | `RequestsItem` |  `{ id: number }`  |
|  PATCH   | `/requests/patch`        | `RequestsItem` | `{ rows: number }` |
|  PATCH   | `/requests/toggle`       |   `number[]`   | `{ rows: number }` |
|  PATCH   | `/requests/delete`       |   `number[]`   | `{ rows: number }` |

* $id = Item ID
* $token = request token


### Settings

|  Method   | Model                      |       Request        |              Response              |
|:---------:|:---------------------------|:--------------------:|:----------------------------------:|
|    GET    | `/settings`                |          ``          |             `Settings`             |
|   PATCH   | `/settings/patch`          | `Partial<Settings>`  |         `{ rows: number }`         |
|   PATCH   | `/settings/locale-install` | `{ locale: string }` | `{ rows: number; locale: string }` |
|   PATCH   | `/settings/locale-default` | `{ locale: string }` | `{ rows: number; locale: string }` |
|   PATCH   | `/settings/locale-toggle`  | `{ locale: string }` | `{ rows: number; locale: string }` |


### Maintenance

|  Method   | Model                                       |  Request  | Response  |
|:---------:|:--------------------------------------------|:---------:|:---------:|
|   PATCH   | `/maintenance/analyze-model-items`          |   `{}`    | `{ ... }` |
|   PATCH   | `/maintenance/permanent-delete-model-items` | `{ ... }` |   `{}`    |



## Public

### Articles

### Attachments

### Categories

### Comments

### Members

### Menu

### MenuItems

### Messages

### Pages

### Tags

### Translations

### Users

### Blacklist

### Requests

### Settings
