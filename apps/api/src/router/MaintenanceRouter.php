<?php

namespace router;

use service\MaintenanceService;

class MaintenanceRouter extends Router {

  public function resolve($env, $method, $url, $data): array {
    $maintenanceService = new MaintenanceService;
    $response = [];

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_patch:
            switch ($url['a']) {

              case 'analyze-model-items':
                $response = $maintenanceService -> analyzeModelItemsToDelete();
                break;

              case 'permanent-delete-model-items':
                $response = $maintenanceService -> deletePermanentlyModelItems($data);
                break;

            }
            break;

        }
        break;

      case self::env_public:
        http_response_code(400);
        $response = [];
        break;

      default:
        http_response_code(200);
        $response = [];
        break;

    }

    return $response;
  }

}
