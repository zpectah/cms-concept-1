# RestApi

## Articles

* $id = Item ID

```
[GET] /private/articles
[GET] /private/articles/id/$id
```

## Attachments

* $id = Item ID

```
[GET] /private/attachments
[GET] /private/attachments/id/$id
```

## Categories

* $id = Item ID

```
[GET] /private/categories
[GET] /private/categories/id/$id
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

## Members

* $id = Item ID
* $email = Member email

```
[GET] /private/members
[GET] /private/members/id/$id
[GET] /private/members/email/$email
```

## Menu

* $id = Item ID

```
[GET] /private/menu
[GET] /private/menu/id/$id
```

## MenuItems

* $id = Item ID
* $menuId = Parent menu id

```
[GET] /private/menuitems
[GET] /private/menuitems/id/$id
[GET] /private/menuitems/menu/$menuId
```

## Messages

* $id = Item ID

```
[GET] /private/messages
[GET] /private/messages/id/$id
```

## Pages

* $id = Item ID

```
[GET] /private/pages
[GET] /private/pages/id/$id
```

## Tags

* $id = Item ID

```
[GET] /private/tags
[GET] /private/tags/id/$id
```

## Translations

* $id = Item ID

```
[GET] /private/translations
[GET] /private/translations/id/$id
```

## Users

* $id = Item ID
* $email = User email

```
[GET] /private/users
[GET] /private/users/id/$id
[GET] /private/users/email/$email
```

## Blacklist

* $id = Item ID

```
[GET] /private/blacklist
[GET] /private/blacklist/id/$id
```

## Requests

* $id = Item ID

```
[GET] /private/requests
[GET] /private/requests/id/$id
```

## Settings

```
[GET] /private/settings
```
