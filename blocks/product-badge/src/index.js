import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('bricotools-blocks/product-badge', {
  title: __('Product Badge', 'bricotools-blocks'),
  icon: 'tag',
  category: 'widgets',
  description: __(
    'Displays a small badge for a product card.',
    'bricotools-blocks',
  ),
  attributes: {
    label: {
      type: 'string',
      source: 'text',
      selector: '.badge-text',
      default: __('Digital', 'bricotools-blocks'),
    },
  },
  edit({ attributes, setAttributes }) {
    const { label } = attributes;
    const blockProps = useBlockProps({
      className: 'brico-product-badge',
    });

    return (
      <div {...blockProps}>
        <span className='badge-square'></span>
        <RichText
          tagName='span'
          className='badge-text'
          value={label}
          onChange={(nextLabel) => setAttributes({ label: nextLabel })}
          placeholder={__('Badge label…', 'bricotools-blocks')}
          allowedFormats={[]}
        />
      </div>
    );
  },
  save({ attributes }) {
    const { label } = attributes;

    return (
      <div className='brico-product-badge'>
        <span className='badge-square'></span>
        <RichText.Content tagName='span' className='badge-text' value={label} />
      </div>
    );
  },
});
