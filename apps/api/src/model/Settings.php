<?php

namespace model;

use PDO;

class Settings extends Model {

  private function dbToJsonDetailMapper($data): array {
    return [
      'project' => [
        'name' => $data['project_name'],
        'description' => $data['project_description'],
      ],
      'locales' => [
        'default' => $data['locales_default'],
        'active' => $data['locales_active'] ? explode(',', $data['locales_active']) : [],
        'installed' => $data['locales_installed'] ? explode(',', $data['locales_installed']) : [],
      ],
      'company' => [
        'name' => $data['company_name'],
        'description' => $data['company_description'],
        'email' => $data['company_email'] ? explode(',', $data['company_email']) : [],
        'phone' => $data['company_phone'] ? explode(',', $data['company_phone']) : [],
        'address' => [
          'street' => $data['company_address_street'],
          'street_no' => $data['company_address_street_no'],
          'district' => $data['company_address_district'],
          'city' => $data['company_address_city'],
          'country' => $data['company_address_country'],
          'zip' => $data['company_address_zip'],
        ],
        'location' => $data['company_location'] ? explode(',', $data['company_location']) : [0,0],
        'bank' => $data['company_bank'],
        'id' => $data['company_id'],
      ],
      'meta' => [
        'title' => $data['meta_title'],
        'description' => $data['meta_description'],
        'keywords' => $data['meta_keywords'] ? explode(',', $data['meta_keywords']) : [],
        'robots' => $data['meta_robots'],
      ],
      'state' => [
        'debug' => $data['state_debug'] === 'true',
        'maintenance' => $data['state_maintenance'] === 'true',
      ],
      'messages' => [
        'active' => $data['messages_active'] === 'true',
        'recipients' => $data['messages_recipients'] ? explode(',', $data['messages_recipients']) : [],
      ],
      'comments' => [
        'active' => $data['comments_active'] === 'true',
        'anonymous' => $data['comments_anonymous'] === 'true',
      ],
      'members' => [
        'active' => $data['members_active'] === 'true',
      ],
      'email' => [
        'smtp' => [
          'port' => $data['email_smtp_port'],
          'host' => $data['email_smtp_host'],
          'username' => $data['email_smtp_username'],
          'password' => $data['email_smtp_password'],
        ],
      ],
    ];
  }

  private function jsonToDbDetailMapper($data): array {
    $settings = [];

    if (isset($data['project'])) {
      if (isset($data['project']['name'])) $settings['project_name'] = $data['project']['name'];
      if (isset($data['project']['description'])) $settings['project_description'] = $data['project']['description'];
    }
    if (isset($data['locales'])) {
      if (isset($data['locales']['default'])) $settings['locales_default'] = $data['locales']['default'];
      if (isset($data['locales']['active'])) $settings['locales_active'] = $data['locales']['active'] ? implode(',', $data['locales']['active']) : '';
      if (isset($data['locales']['installed'])) $settings['locales_installed'] = $data['locales']['installed'] ? implode(',', $data['locales']['installed']) : '';
    }
    if (isset($data['company'])) {
      if (isset($data['company']['name'])) $settings['company_name'] = $data['company']['name'];
      if (isset($data['company']['description'])) $settings['company_description'] = $data['company']['description'];
      if (isset($data['company']['email'])) $settings['company_email'] = $data['company']['email'] ? implode(',', $data['company']['email']) : '';
      if (isset($data['company']['phone'])) $settings['company_phone'] = $data['company']['phone'] ? implode(',', $data['company']['phone']) : '';
      if (isset($data['company']['address'])) {
        if (isset($data['company']['address']['street'])) $settings['company_address_street'] = $data['company']['address']['street'];
        if (isset($data['company']['address']['street_no'])) $settings['company_address_street_no'] = $data['company']['address']['street_no'];
        if (isset($data['company']['address']['district'])) $settings['company_address_district'] = $data['company']['address']['district'];
        if (isset($data['company']['address']['city'])) $settings['company_address_city'] = $data['company']['address']['city'];
        if (isset($data['company']['address']['country'])) $settings['company_address_country'] = $data['company']['address']['country'];
        if (isset($data['company']['address']['zip'])) $settings['company_address_zip'] = $data['company']['address']['zip'];
      }
      if (isset($data['company']['location'])) $settings['company_location'] = $data['company']['location'] ? implode(',', $data['company']['location']) : '0,0';
      if (isset($data['company']['bank'])) $settings['company_bank'] = $data['company']['bank'];
      if (isset($data['company']['id'])) $settings['company_id'] = $data['company']['id'];
    }
    if (isset($data['meta'])) {
      if (isset($data['meta']['title'])) $settings['meta_title'] = $data['meta']['title'];
      if (isset($data['meta']['description'])) $settings['meta_description'] = $data['meta']['description'];
      if (isset($data['meta']['keywords'])) $settings['meta_keywords'] = $data['meta']['keywords'] ? implode(',', $data['meta']['keywords']) : '';
      if (isset($data['meta']['robots'])) $settings['meta_robots'] = $data['meta']['robots'];
    }
    if (isset($data['state'])) {
      if (isset($data['state']['debug'])) $settings['state_debug'] = $data['state']['debug'] ? 'true' : 'false';
      if (isset($data['state']['maintenance'])) $settings['state_maintenance'] = $data['state']['maintenance'] ? 'true' : 'false';
    }
    if (isset($data['messages'])) {
      if (isset($data['messages']['active'])) $settings['messages_active'] = $data['messages']['active'] ? 'true' : 'false';
      if (isset($data['messages']['recipients'])) $settings['messages_recipients'] = $data['messages']['recipients'] ? implode(',', $data['messages']['recipients']) : '';
    }
    if (isset($data['comments'])) {
      if (isset($data['comments']['active'])) $settings['comments_active'] = $data['comments']['active'] ? 'true' : 'false';
      if (isset($data['comments']['anonymous'])) $settings['comments_anonymous'] = $data['comments']['anonymous'] ? 'true' : 'false';
    }
    if (isset($data['members'])) {
      if (isset($data['members']['active'])) $settings['members_active'] = $data['members']['active'] ? 'true' : 'false';
    }
    if (isset($data['email'])) {
      if (isset($data['email']['smtp'])) {
        if (isset($data['email']['smtp']['port'])) $settings['email_smtp_port'] = $data['email']['smtp']['port'];
        if (isset($data['email']['smtp']['host'])) $settings['email_smtp_host'] = $data['email']['smtp']['host'];
        if (isset($data['email']['smtp']['username'])) $settings['email_smtp_username'] = $data['email']['smtp']['username'];
        if (isset($data['email']['smtp']['password']) && $data['email']['smtp']['password'] !== '') {
          $settings['email_smtp_password'] = encrypt_string($data['email']['smtp']['password'], EMAIL_SMTP_CRYPT_KEY);
        }
      }
    }

    return $settings;
  }

  private function patchRow($name, $value): array|int {
    $conn = self::connection();

    if (!isset($name) || !isset($value)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $sql = "UPDATE `settings` SET value = :value WHERE name = :name";

    $stmt = $conn -> prepare($sql);

    $stmt -> bindParam(':value', $value);
    $stmt -> bindParam(':name', $name);

    $stmt -> execute();

    return $stmt -> rowCount();
  }

  private function createLocaleTables($locale, $source): array {
    $conn = self::connection();
    $results = [];

    $tables = [
      'articles',
      'categories',
      'menuitems',
      'pages',
      'translations'
    ];

    foreach ($tables as $table) {
      $newTable = "{$table}_{$locale}";
      $sourceTable = "{$table}_{$source}";

      $stmt = $conn -> query("SHOW TABLES LIKE " . $conn -> quote($newTable));

      if ($stmt -> fetch()) {
        return [
          'error' => true,
          'message' => 'Table already exists',
        ];
      }

      $stmt = $conn -> query("SHOW TABLES LIKE " . $conn -> quote($sourceTable));

      if (!$stmt -> fetch()) {
        return [
          'error' => true,
          'message' => 'Source table dont exists',
        ];
      }

      $createStmt = $conn -> query("SHOW CREATE TABLE `{$sourceTable}`");
      $row = $createStmt -> fetch();

      if (!$row || !isset($row['Create Table'])) {
        return [
          'error' => true,
          'message' => 'Cannot load source table',
        ];
      }

      $createSql = $row['Create Table'];
      $createSql = str_replace("`{$sourceTable}`", "`{$newTable}`", $createSql);

      $conn -> exec($createSql);
      $conn -> exec("INSERT INTO `{$newTable}` SELECT * FROM `{$sourceTable}`");

      $results[] = $newTable;
    }

    return $results;
  }



  public function getTable(): array {
    $conn = self::connection();

    $sql = "SELECT name, value FROM `settings`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $object = [];

    foreach ($result as $row) {
      $object[$row['name']] = $row['value'];
    }

    return self::dbToJsonDetailMapper($object);
  }

  public function patch($data): array {
    $conn = self::connection();

    $data = self::jsonToDbDetailMapper($data);

    $sql = "UPDATE `settings` SET value = :value WHERE name = :name";
    $stmt = $conn -> prepare($sql);

    $rows = 0;

    foreach ($data as $name => $value) {
      $stmt -> bindParam(':value', $value);
      $stmt -> bindParam(':name', $name);

      if ($stmt -> execute()) $rows++;
    }

    return [
      'rows' => $rows,
    ];
  }

  public function localeInstall($data): array {
    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $settings = self::getTable();
    $installed = $settings['locales']['installed'];
    $default = $settings['locales']['default'];
    $localeToInstall = $data['locale'];

    if (in_array($localeToInstall, $installed)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'Locale ' . $localeToInstall . ' already installed'
      ];
    }

    $newValue = [ ...$installed, $localeToInstall ];
    $newValue = implode(',', $newValue);

    $tables = self::createLocaleTables($localeToInstall, $default);

    $rows = self::patchRow('locales_installed', $newValue);

    return [
      'rows' => $rows,
      'locale' => $localeToInstall,
      'tables' => $tables,
    ];
  }

  public function localeToggle($data): array {
    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $settings = self::getTable();
    $active = $settings['locales']['active'];
    $localeToToggle = $data['locale'];

    $newValue = toggleArrayItem($active, $localeToToggle);
    $newValue = implode(',', $newValue);

    return [
      'rows' => self::patchRow('locales_active', $newValue),
      'locale' => $localeToToggle,
    ];
  }

  public function localeDefault($data): array {
    if (empty($data)) {
      // TODO: error code
      return [
        'error' => true,
        'message' => 'No data provided'
      ];
    }

    $localeToDefault = $data['locale'];

    return [
      'rows' => self::patchRow('locales_default', $localeToDefault),
      'locale' => $localeToDefault,
    ];
  }

}
