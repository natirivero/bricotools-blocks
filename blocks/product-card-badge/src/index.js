import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('bricotools-blocks/product-card-badge', {
  title: __('Product Card Badge', 'bricotools-blocks'),
  icon: 'tag',
  category: 'widgets',
  description: __('Displays a small badge for a product card.', 'bricotools-blocks'),
  attributes: {
    label: {
      type: 'string',
      source: 'text',
      selector: 'span',
      default: __('Digital', 'bricotools-blocks'),
    },
  },
  edit({ attributes, setAttributes }) {
    const { label } = attributes;
    const blockProps = useBlockProps({
      className: 'bricotools-product-card-badge',
    });

    return (
      <RichText
        {...blockProps}
        tagName="span"
        value={label}
        onChange={(nextLabel) => setAttributes({ label: nextLabel })}
        placeholder={__('Badge label…', 'bricotools-blocks')}
        allowedFormats={[]}
      />
    );
  },
  save({ attributes }) {
    const { label } = attributes;
    const blockProps = useBlockProps.save({
      className: 'bricotools-product-card-badge',
    });

    return (
      <RichText.Content
        {...blockProps}
        tagName="span"
        value={label}
      />
    );
  },
});
