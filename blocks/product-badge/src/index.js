import { registerBlockType } from '@wordpress/blocks';
import {
  InspectorControls,
  RichText,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './style.css';

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
      default: __('Digital', 'bricotools-blocks'),
    },
    onlyDownloadable: {
      type: 'boolean',
      default: true,
    },
  },
  edit({ attributes, setAttributes }) {
    const { label, onlyDownloadable } = attributes;
    const blockProps = useBlockProps({
      className: 'brico-product-badge',
    });

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__('Display Settings', 'bricotools-blocks')}
            initialOpen={true}
          >
            <ToggleControl
              label={__(
                'Only show for downloadable products',
                'bricotools-blocks',
              )}
              checked={onlyDownloadable}
              onChange={(value) => setAttributes({ onlyDownloadable: value })}
              help={
                onlyDownloadable
                  ? __(
                      'Frontend: hidden for non-downloadable products.',
                      'bricotools-blocks',
                    )
                  : __(
                      'Frontend: always shown (development mode).',
                      'bricotools-blocks',
                    )
              }
            />
          </PanelBody>
        </InspectorControls>

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
      </>
    );
  },
  save() {
    return null;
  },
});
