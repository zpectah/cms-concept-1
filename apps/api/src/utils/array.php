<?php

function toggleArrayItem(array $array, $item): array {
  $key = array_search($item, $array, true);

  if ($key !== false) {
    unset($array[$key]);

    $array = array_values($array);
  } else {
    $array[] = $item;
  }

  return $array;
}
