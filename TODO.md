# TODO

## Admin

* [] Obecné 'loadovátko' v pravém spodním rohu - načítání (settings, user)
* [] Refactoring komponenty 'ListItems' ?
* [] U objektů (users, members) - nechat field name podle vyplněného jména a přijmení, jinak vygenerovat náhodný
* [OK] Instalace jazyka - vytvoření tabulek ...
* [] Sjednotit tlačítka v tabulce - jednotnou barvu, obrátit ten active stav
* [OK] Heslo - users/members
* [] User account - login
```
$plain_password_from_form = $_POST['password']; // Heslo z formuláře
$db_hash = $user_record['password']; // Haš z databáze

if (password_verify($plain_password_from_form, $db_hash)) {
    // Hesla se shodují, uživatel je přihlášen.
} else {
    // Hesla se neshodují, chyba.
}
```
* [] User account - lost password
* [] User account - správa
* [] Menu items picker !!!
* [] Comments manager !!!
* [] Attachments picker - update/rozšíření
* [OK] Settings - languages - při instalaci otevřít potvrzovací okno ...
* [] Settings - maintenance - pouštění scriptů
