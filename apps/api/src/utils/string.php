<?php

function getRandomString(int $length = 16): string {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';

  for ($i = 0; $i < $length; $i++) {
    $randomIndex = random_int(0, $charactersLength - 1);

    $randomString .= $characters[$randomIndex];
  }

  return $randomString;
}
