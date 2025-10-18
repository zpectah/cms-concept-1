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
[POST] /private/articles/toggle
[POST] /private/articles/delete
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
[POST] /private/attachments/toggle
[POST] /private/attachments/delete
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
[POST] /private/categories/toggle
[POST] /private/categories/delete
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
[POST] /private/comments/toggle
[POST] /private/comments/delete
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
[POST] /private/members/toggle
[POST] /private/members/delete
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
[POST] /private/menu/toggle
[POST] /private/menu/delete
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
[POST] /private/menuitems/toggle
[POST] /private/menuitems/delete
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
[POST] /private/messages/toggle
[POST] /private/messages/delete
[POST] /private/messages/read
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
[POST] /private/pages/toggle
[POST] /private/pages/delete
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
[POST] /private/tags/toggle
[POST] /private/tags/delete
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
[POST] /private/translations/toggle
[POST] /private/translations/delete
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
[POST] /private/users/toggle
[POST] /private/users/delete
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
[POST] /private/blacklist/toggle
[POST] /private/blacklist/delete
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
[POST] /private/requests/toggle
[POST] /private/requests/delete
```

## Settings

```
[GET] /private/settings
```
* Partial(Settings)
```
[POST] /private/settings/update
```
