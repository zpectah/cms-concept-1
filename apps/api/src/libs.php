<?php

require PATH_ROOT . 'vendor/autoload.php';

require_once PATH_ROOT . 'utils/array.php';
require_once PATH_ROOT . 'utils/string.php';

require_once PATH_ROOT . 'Response.php';

require_once PATH_ROOT . 'router/Router.php';
require_once PATH_ROOT . 'router/ArticlesRouter.php';
require_once PATH_ROOT . 'router/AttachmentsRouter.php';
require_once PATH_ROOT . 'router/BlacklistRouter.php';
require_once PATH_ROOT . 'router/CategoriesRouter.php';
require_once PATH_ROOT . 'router/CommentsRouter.php';
require_once PATH_ROOT . 'router/MaintenanceRouter.php';
require_once PATH_ROOT . 'router/MemberRouter.php';
require_once PATH_ROOT . 'router/MembersRouter.php';
require_once PATH_ROOT . 'router/MenuRouter.php';
require_once PATH_ROOT . 'router/MenuItemsRouter.php';
require_once PATH_ROOT . 'router/MessagesRouter.php';
require_once PATH_ROOT . 'router/PagesRouter.php';
require_once PATH_ROOT . 'router/RequestsRouter.php';
require_once PATH_ROOT . 'router/SettingsRouter.php';
require_once PATH_ROOT . 'router/TagsRouter.php';
require_once PATH_ROOT . 'router/TranslationsRouter.php';
require_once PATH_ROOT . 'router/UserRouter.php';
require_once PATH_ROOT . 'router/UsersRouter.php';

require_once PATH_ROOT . 'model/Model.php';
require_once PATH_ROOT . 'model/Articles.php';
require_once PATH_ROOT . 'model/Attachments.php';
require_once PATH_ROOT . 'model/Blacklist.php';
require_once PATH_ROOT . 'model/Categories.php';
require_once PATH_ROOT . 'model/Comments.php';
require_once PATH_ROOT . 'model/Members.php';
require_once PATH_ROOT . 'model/Menu.php';
require_once PATH_ROOT . 'model/MenuItems.php';
require_once PATH_ROOT . 'model/Messages.php';
require_once PATH_ROOT . 'model/Pages.php';
require_once PATH_ROOT . 'model/Requests.php';
require_once PATH_ROOT . 'model/Settings.php';
require_once PATH_ROOT . 'model/Tags.php';
require_once PATH_ROOT . 'model/Translations.php';
require_once PATH_ROOT . 'model/Users.php';

require_once PATH_ROOT . 'service/EmailService.php';
require_once PATH_ROOT . 'service/MaintenanceService.php';
require_once PATH_ROOT . 'service/SessionService.php';
