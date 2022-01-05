<?php

namespace Drupal\ilr;

use Drupal\Core\PathProcessor\InboundPathProcessorInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Processes media download paths to make them static site friendly.
 */
class PathProcessor implements InboundPathProcessorInterface {

  /**
   * {@inheritdoc}
   */
  public function processInbound($path, Request $request) {
    if (preg_match('|^(/media/\d+/download)/.*|', $path, $matches)) {
      $path = $matches[1];
    }
    return $path;
  }

}
