<?php

if (! defined('ABSPATH')) {
  exit;
}

if (! function_exists('bricotools_blocks_is_downloadable_product')) {
  function bricotools_blocks_is_downloadable_product($post_id = 0)
  {
    if ($post_id <= 0) {
      return false;
    }

    if (function_exists('wc_get_product')) {
      $wc_product = wc_get_product($post_id);

      if ($wc_product) {
        return (bool) $wc_product->is_downloadable();
      }
    }

    if ('product' === get_post_type($post_id)) {
      return 'yes' === get_post_meta($post_id, '_downloadable', true);
    }

    return false;
  }
}

if (! function_exists('bricotools_blocks_render_product_badge')) {
  function bricotools_blocks_render_product_badge($attributes, $content, $block)
  {
    $label = isset($attributes['label']) ? trim((string) $attributes['label']) : 'Digital';
    $label = '' === $label ? 'Digital' : $label;

    $only_downloadable = ! isset($attributes['onlyDownloadable']) || (bool) $attributes['onlyDownloadable'];

    if ($only_downloadable) {
      $post_id = 0;

      if (isset($block->context['postId'])) {
        $post_id = (int) $block->context['postId'];
      }

      if ($post_id <= 0) {
        $post_id = (int) get_the_ID();
      }

      if (! bricotools_blocks_is_downloadable_product($post_id)) {
        return '';
      }
    }

    return sprintf(
      '<div class="brico-product-badge"><div class="brico-product-badge-inner"><span class="badge-square"></span><span class="badge-text">%s</span></div></div>',
      esc_html($label)
    );
  }
}
