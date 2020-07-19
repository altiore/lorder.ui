import React, { useRef } from 'react';

import { WrappedFieldProps } from 'redux-form';

import JoditEditor from 'jodit-react';

import { BUTTONS_LIST } from './constants';

const onChangeDefault = () => null;

export interface ITextAreaHtmlProps extends WrappedFieldProps {
  placeholder?: string;
  onChangeCb?: () => void;
}

export const TextAreaHtmlTsx: React.FC<ITextAreaHtmlProps> = ({ input, placeholder, onChangeCb = onChangeDefault }) => {
  const editor = useRef(null);
  /**
   * @see https://xdsoft.net/jodit/doc/
   */
  const config: any = {
    buttons: BUTTONS_LIST,
    buttonsMD: BUTTONS_LIST,
    buttonsSM: BUTTONS_LIST,
    buttonsXS: BUTTONS_LIST,
    minHeight: 360,
    placeholder,
    readonly: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbar: true,
  };

  return (
    <JoditEditor ref={editor} value={input.value || ''} config={config} onBlur={input.onChange} onChange={onChangeCb} />
  );
};
