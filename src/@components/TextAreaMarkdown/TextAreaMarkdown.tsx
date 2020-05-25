import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import SimpleMDE from 'react-simplemde-editor';

import get from 'lodash/get';
import { WrappedFieldProps } from 'redux-form';

import { ToolbarDropdownIcon, ToolbarIcon } from 'easymde';
import * as EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

type ToolbarButton =
  | 'bold'
  | 'italic'
  | 'quote'
  | 'unordered-list'
  | 'ordered-list'
  | 'link'
  | 'image'
  | 'strikethrough'
  | 'code'
  | 'table'
  | 'redo'
  | 'heading'
  | 'undo'
  | 'heading-bigger'
  | 'heading-smaller'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'clean-block'
  | 'horizontal-rule'
  | 'preview'
  | 'side-by-side'
  | 'fullscreen'
  | 'guide';

type ToolBarEl = ReadonlyArray<'|' | ToolbarButton | ToolbarIcon | ToolbarDropdownIcon>;

export interface ITextAreaMarkdownProps extends WrappedFieldProps {
  placeholder?: string;
}

export const TextAreaMarkdownTsx: React.FC<ITextAreaMarkdownProps> = ({ input, placeholder }) => {
  const editor = useRef<SimpleMDEEditor>(null);

  useEffect(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']);
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (!simpleMde.isPreviewActive()) {
        simpleMde.togglePreview();
      }
    }
  }, [editor]);

  const handlePreview = useCallback((easyMDE: EasyMDE) => {
    EasyMDE.togglePreview(easyMDE);
  }, []);

  const toolbar = useMemo(() => {
    const previewBtn: ToolbarIcon = {
      action: handlePreview,
      className: 'fa fa-eye',
      name: 'preview',
      noDisable: true,
      title: 'Bold',
    };
    const toolbarBlocks: ToolBarEl[] = [
      ['bold', 'italic', 'heading'],
      ['quote', 'code', 'unordered-list', 'ordered-list'],
      ['link', 'image'],
      [previewBtn, 'side-by-side', 'fullscreen'],
      ['guide'],
    ];
    return toolbarBlocks.reduce((res: ToolBarEl, cur: ToolBarEl) => {
      if (res.length && cur.length) {
        res = res.concat(['|']);
      }
      res = res.concat(cur);
      return res;
    }, []);
  }, [handlePreview]);

  /**
   * @see https://github.com/RIP21/react-simplemde-editor - react version
   * @see https://github.com/sparksuite/simplemde-markdown-editor - full version
   */
  return (
    <SimpleMDE
      ref={editor}
      onChange={input.onChange}
      value={input.value}
      options={{
        placeholder,
        spellChecker: false,
        toolbar,
      }}
    />
  );
};
