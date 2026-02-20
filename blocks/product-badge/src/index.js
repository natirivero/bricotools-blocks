import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Notice, PanelBody, ToggleControl } from '@wordpress/components';
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
    onlyDownloadable: {
      type: 'boolean',
      default: true,
    },
  },
  edit({ attributes, setAttributes }) {
    const { onlyDownloadable } = attributes;
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
          <Notice status='info' isDismissible={false}>
            {__(
              'This badge is shown only for some products, depending on their settings.',
              'bricotools-blocks',
            )}
          </Notice>
        </div>
      </>
    );
  },
  save() {
    return null;
  },
});
