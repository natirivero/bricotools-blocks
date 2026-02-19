<?php

/**
 * Plugin Name: BricoTools Blocks
 * Plugin URI: https://brico.tools
 * Description: Custom blocks by BricoTools.
 * Version: 1.0.0
 * Author: BricoTools
 * Author URI: https://brico.tools
 * Text Domain: bricotools-blocks
 */

if (! defined('ABSPATH')) {
  // Prevent direct access to this file outside WordPress.
  exit;
}

if (! defined('BTB_PATH')) {
  define('BTB_PATH', plugin_dir_path(__FILE__));
}

if (! defined('BTB_URL')) {
  define('BTB_URL', plugin_dir_url(__FILE__));
}

require_once BTB_PATH . '/blocks/icon-add-to-card/index.php';
require_once BTB_PATH . '/blocks/product-badge/index.php';

// Discover and register every block inside /blocks/* based on block.json.
// This lets you add new blocks by creating a folder with metadata + build files.
function bricotools_blocks_register_blocks()
{
  // Absolute path to the plugin's blocks directory.
  $blocks_dir = BTB_PATH . 'blocks';

  // Stop early if the plugin has no blocks folder.
  if (! is_dir($blocks_dir)) {
    return;
  }

  // Get all first-level block folders (e.g. /blocks/icon-add-to-card).
  $block_folders = glob($blocks_dir . '/*', GLOB_ONLYDIR);

  // Guard against unexpected glob() failures.
  if (! is_array($block_folders)) {
    return;
  }

  foreach ($block_folders as $block_folder) {
    // Folder name is used as block slug helper.
    $slug = basename($block_folder);
    $metadata_path = $block_folder . '/block.json';

    // A block is only valid if block.json exists.
    if (! file_exists($metadata_path)) {
      continue;
    }

    // Optional runtime args per block (render callbacks, supports overrides, etc.).
    $block_args = array();

    if ('product-badge' === $slug) {
      $block_args['render_callback'] = 'bricotools_blocks_render_product_badge';
    }

    // Register from folder metadata (reads block.json + generated assets).
    register_block_type($block_folder, $block_args);
  }
}

// Register blocks when WordPress initializes.
add_action('init', 'bricotools_blocks_register_blocks');
