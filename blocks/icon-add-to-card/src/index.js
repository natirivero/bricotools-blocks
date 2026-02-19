import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

import './style.css';

domReady(() => {
  registerBlockVariation('woocommerce/product-button', {
    name: 'bricotools/icon-add-to-cart',
    title: __('Icon Add to Cart', 'bricotools-blocks'),
    description: __(
      'Product button variation styled as an icon-only add to cart button.',
      'bricotools-blocks',
    ),
    icon: 'plus-alt2',
    attributes: {
      className: 'is-style-btb-icon-add-to-cart',
    },
    isActive: (attributes) => {
      return (attributes.className || '').includes(
        'is-style-btb-icon-add-to-cart',
      );
    },
    scope: ['inserter', 'transform'],
  });
});
