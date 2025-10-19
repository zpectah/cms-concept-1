<?php

namespace service;

class MaintenanceService {

  public function analyzeModelItemsToDelete($data): array {

    return [
      'toAnalyze' => $data,
    ];
  }

  public function deletePermanentlyModelItems($data): array {

    return [
      'toDelete' => $data,
    ];
  }

}
