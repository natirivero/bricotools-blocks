<?php

if (! defined('ABSPATH')) {
  exit;
}

/**
 * Register block assets
 */
if (! function_exists('btb_register_icon_add_to_cart_variation_assets')) {
  function btb_register_icon_add_to_cart_variation_assets()
  {
    $asset_path = BTB_PATH . 'blocks/icon-add-to-cart/build/index.asset.php';

    if (! file_exists($asset_path)) {
      return;
    }

    $asset = include $asset_path;

    wp_register_script(
      'btb-icon-add-to-cart-variation',
      BTB_URL . 'blocks/icon-add-to-cart/build/index.js',
      isset($asset['dependencies']) ? $asset['dependencies'] : array(),
      isset($asset['version']) ? $asset['version'] : '1.0.0',
      true
    );

    wp_set_script_translations(
      'btb-icon-add-to-cart-variation',
      'bricotools-blocks',
      BTB_PATH . 'languages'
    );

    $style_path = BTB_PATH . 'blocks/icon-add-to-cart/build/style-index.css';

    if (file_exists($style_path)) {
      wp_register_style(
        'btb-icon-add-to-cart-variation-style',
        BTB_URL . 'blocks/icon-add-to-cart/build/style-index.css',
        array(),
        (string) filemtime($style_path)
      );
    }

    $editor_style_path = BTB_PATH . 'blocks/icon-add-to-cart/build/index.css';

    if (file_exists($editor_style_path)) {
      wp_register_style(
        'btb-icon-add-to-cart-variation-editor-style',
        BTB_URL . 'blocks/icon-add-to-cart/build/index.css',
        array(),
        (string) filemtime($editor_style_path)
      );
    }
  }
}
add_action('init', 'btb_register_icon_add_to_cart_variation_assets');

/**
 * Enqueue block assets 
 */
if (! function_exists('btb_enqueue_icon_add_to_cart_variation_script')) {
  function btb_enqueue_icon_add_to_cart_variation_script()
  {
    wp_enqueue_script('btb-icon-add-to-cart-variation');

    if (wp_style_is('btb-icon-add-to-cart-variation-editor-style', 'registered')) {
      wp_enqueue_style('btb-icon-add-to-cart-variation-editor-style');
    }
  }
}
add_action('enqueue_block_editor_assets', 'btb_enqueue_icon_add_to_cart_variation_script');

if (! function_exists('btb_enqueue_icon_add_to_cart_variation_style')) {
  function btb_enqueue_icon_add_to_cart_variation_style()
  {
    if (wp_style_is('btb-icon-add-to-cart-variation-style', 'registered')) {
      wp_enqueue_style('btb-icon-add-to-cart-variation-style');
    }
  }
}
add_action('enqueue_block_assets', 'btb_enqueue_icon_add_to_cart_variation_style');
