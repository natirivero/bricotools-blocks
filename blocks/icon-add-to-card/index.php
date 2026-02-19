<?php

if (! defined('ABSPATH')) {
  exit;
}

if (! function_exists('bricotools_blocks_render_icon_add_to_card')) {
  function bricotools_blocks_render_icon_add_to_card($attributes, $content, $block)
  {
    if (! function_exists('wc_get_product')) {
      return '';
    }

    $post_id = 0;

    if (isset($block->context['postId'])) {
      $post_id = (int) $block->context['postId'];
    }

    if ($post_id <= 0) {
      $post_id = (int) get_the_ID();
    }

    if ($post_id <= 0) {
      return '';
    }

    $product = wc_get_product($post_id);

    if (! $product instanceof WC_Product) {
      return '';
    }

    if (! $product->is_purchasable() || ! $product->is_in_stock()) {
      return '';
    }

    $add_to_cart_url = class_exists('WC_AJAX')
      ? WC_AJAX::get_endpoint('add_to_cart')
      : home_url('/?wc-ajax=add_to_cart');

    $fragments_url = class_exists('WC_AJAX')
      ? WC_AJAX::get_endpoint('get_refreshed_fragments')
      : home_url('/?wc-ajax=get_refreshed_fragments');

    return sprintf(
      '<button type="button" class="bricotools-icon-add-to-card btb-ajax-add-to-cart" data-product-id="%1$d" data-quantity="1" data-add-to-cart-url="%2$s" data-fragments-url="%3$s" aria-label="%4$s">+</button>',
      (int) $product->get_id(),
      esc_url($add_to_cart_url),
      esc_url($fragments_url),
      esc_attr__('Add to cart', 'bricotools-blocks')
    );
  }
}
