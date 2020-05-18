import React, { useCallback, useRef } from 'react';

import { WrappedFieldProps } from 'redux-form';

import JoditEditor from 'jodit-react';

export interface ITextAreaMarkdownProps extends WrappedFieldProps {
  placeholder?: string;
}

export const TextAreaMarkdownTsx: React.FC<ITextAreaMarkdownProps> = ({ input, placeholder }) => {
  const editor = useRef(null);

  /* tslint:disable */
  /* eslint:disable */
  const handleChange = useCallback(() => {}, []);

  /**
   * @see https://xdsoft.net/jodit/doc/
   */
  const config = {
    minHeight: 360,
    placeholder,
    readonly: false,
  };

  return (
    <JoditEditor
      ref={editor}
      value={input.value || ''}
      config={config}
      onBlur={input.onChange}
      onChange={handleChange}
    />
  );
};
