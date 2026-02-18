import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('bricotools-blocks/icon-add-to-card', {
  title: __('Icon Add to Card', 'bricotools-blocks'),
  icon: 'plus-alt2',
  category: 'widgets',
  description: __('Displays an add-to-card icon.', 'bricotools-blocks'),
  edit() {
    const blockProps = useBlockProps({
      className: 'bricotools-icon-add-to-card',
      style: { fontWeight: 'bold', fontSize: '20px', lineHeight: '1' },
      'aria-hidden': 'true',
    });

    return <span {...blockProps}>+</span>;
  },
  save() {
    return null;
  },
});
