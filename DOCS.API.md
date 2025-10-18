# RestApi

## Articles

* $id = Item ID

```
[GET] /private/articles
[GET] /private/articles/id/$id
```
* ArticlesDetail
```
[POST] /private/articles/create
[PATCH] /private/articles/patch
```
* number[]
```
[PATCH] /private/articles/toggle
[PATCH] /private/articles/delete
```

## Attachments

* $id = Item ID

```
[GET] /private/attachments
[GET] /private/attachments/id/$id
```

* AttachmentsDetail
```
[POST] /private/attachments/create
[PATCH] /private/attachments/patch
```
* number[]
```
[PATCH] /private/attachments/toggle
[PATCH] /private/attachments/delete
```

## Categories

* $id = Item ID

```
[GET] /private/categories
[GET] /private/categories/id/$id
```
* CategoriesDetail
```
[POST] /private/categories/create
[PATCH] /private/categories/patch
```
* number[]
```
[PATCH] /private/categories/toggle
[PATCH] /private/categories/delete
```

## Comments

* $id = Item ID
* $contentType = Content model type
* $contentId = Id of content by type

```
[GET] /private/comments
[GET] /private/comments/id/$id
[GET] /private/comments/$contentType/$contentId
```
* CommentsDetail
```
[POST] /private/comments/create
[PATCH] /private/comments/patch
```
* number[]
```
[PATCH] /private/comments/toggle
[PATCH] /private/comments/delete
```

## Members

* $id = Item ID
* $email = Member email

```
[GET] /private/members
[GET] /private/members/id/$id
[GET] /private/members/email/$email
```
* MembersDetail
```
[POST] /private/members/create
[PATCH] /private/members/patch
```
* number[]
```
[PATCH] /private/members/toggle
[PATCH] /private/members/delete
```

## Menu

* $id = Item ID

```
[GET] /private/menu
[GET] /private/menu/id/$id
```
* MenuDetail
```
[POST] /private/menu/create
[PATCH] /private/menu/patch
```
* number[]
```
[PATCH] /private/menu/toggle
[PATCH] /private/menu/delete
```

## MenuItems

* $id = Item ID
* $menuId = Parent menu id

```
[GET] /private/menuitems
[GET] /private/menuitems/id/$id
[GET] /private/menuitems/menu/$menuId
```
* MenuItemsDetail
```
[POST] /private/menuitems/create
[PATCH] /private/menuitems/patch
```
* number[]
```
[PATCH] /private/menuitems/toggle
[PATCH] /private/menuitems/delete
```

## Messages

* $id = Item ID

```
[GET] /private/messages
[GET] /private/messages/id/$id
```
* MessagesDetail
```
[POST] /private/messages/create
[PATCH] /private/messages/patch
```
* number[]
```
[PATCH] /private/messages/toggle
[PATCH] /private/messages/delete
[PATCH] /private/messages/read
```

## Pages

* $id = Item ID

```
[GET] /private/pages
[GET] /private/pages/id/$id
```
* PagesDetail
```
[POST] /private/pages/create
[PATCH] /private/pages/patch
```
* number[]
```
[PATCH] /private/pages/toggle
[PATCH] /private/pages/delete
```

## Tags

* $id = Item ID

```
[GET] /private/tags
[GET] /private/tags/id/$id
```
* TagsDetail
```
[POST] /private/tags/create
[PATCH] /private/tags/patch
```
* number[]
```
[PATCH] /private/tags/toggle
[PATCH] /private/tags/delete
```

## Translations

* $id = Item ID

```
[GET] /private/translations
[GET] /private/translations/id/$id
```
* TranslationsDetail
```
[POST] /private/translations/create
[PATCH] /private/translations/patch
```
* number[]
```
[PATCH] /private/translations/toggle
[PATCH] /private/translations/delete
```

## Users

* $id = Item ID
* $email = User email

```
[GET] /private/users
[GET] /private/users/id/$id
[GET] /private/users/email/$email
```
* UsersDetail
```
[POST] /private/users/create
[PATCH] /private/users/patch
```
* number[]
```
[PATCH] /private/users/toggle
[PATCH] /private/users/delete
```

## Blacklist

* $id = Item ID

```
[GET] /private/blacklist
[GET] /private/blacklist/id/$id
```
* BlacklistItem
```
[POST] /private/blacklist/create
[PATCH] /private/blacklist/patch
```
* number[]
```
[PATCH] /private/blacklist/toggle
[PATCH] /private/blacklist/delete
```

## Requests

* $id = Item ID
* $token = request token

```
[GET] /private/requests
[GET] /private/requests/id/$id
[GET] /private/requests/token/$token
```
* RequestsItem
```
[POST] /private/requests/create
[PATCH] /private/requests/patch
```
* number[]
```
[PATCH] /private/requests/toggle
[PATCH] /private/requests/delete
```

## Settings

```
[GET] /private/settings
```
* Partial(Settings)
```
[PATCH] /private/settings/update
```
* { locale: string }
```
[PATCH] /private/settings/locale-install
[PATCH] /private/settings/locale-default
[PATCH] /private/settings/locale-toggle
```
