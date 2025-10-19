<?php

namespace router;

use service\MaintenanceService;

class Maintenance extends Router {

  public function resolve($env, $method, $url, $data): array {
    $maintenanceService = new MaintenanceService;

    switch ($env) {

      case self::env_private:
        switch ($method) {

          case self::method_patch:
            switch ($url['a']) {

              case 'analyze-model-items':
                $response = $maintenanceService -> analyzeModelItemsToDelete($data);
                break;

              case 'delete-permanent-model-items':
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
