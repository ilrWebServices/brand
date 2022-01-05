<?php

namespace Drupal\ilr\Plugin\Filter;

use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;
use Drupal\Component\Utility\Html;

/**
 * Provides a filter to append filenames to download links.
 *
 * @Filter(
 *   id = "filter_download_links",
 *   title = @Translation("ILR Download Link Fixer"),
 *   description = @Translation("Add a filename with extension to download links."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE,
 * )
 */
class DownloadExtensionFilter extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $media_storage = \Drupal::entityTypeManager()->getStorage('media');
    $result = new FilterProcessResult($text);
    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);

    // Find all of the <a> elements with an href attribute.
    foreach ($xpath->query('//a[@href]') as $node) {
      $path = $node->getAttribute('href');

      if (preg_match('|^/media/(\d+)/download$|', $path, $matches)) {
        /** @var \Drupal\media\MediaInterface $media */
        $media = $media_storage->load($matches[1]);

        if (!$media) {
          continue;
        }

        // field_media_file, field_media_image
        if ($media->hasField('field_media_' . $media->bundle())) {
          /** @var \Drupal\file\Entity\File $file */
          $file = $media->get('field_media_' . $media->bundle())->first()->entity;
          $node->setAttribute('href', $path . '/' . $file->getFilename());
        }
      }
    }

    $result->setProcessedText(Html::serialize($dom));
    return $result;
  }

}
