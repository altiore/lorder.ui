import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import SimpleMDE from 'react-simplemde-editor';

import get from 'lodash/get';
import { WrappedFieldProps } from 'redux-form';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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

interface ICurSimpleMDE {
  isPreviewActive: () => boolean;
  togglePreview: () => void;
}

export interface ITextAreaMarkdownProps extends WrappedFieldProps {
  placeholder?: string;
}

export const TextAreaMarkdownTsx: React.FC<ITextAreaMarkdownProps> = ({ input, placeholder }) => {
  const editor = useRef<SimpleMDEEditor>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const setPreviewMode = useCallback(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (!simpleMde.isPreviewActive()) {
        setIsEditing(true);
        simpleMde.togglePreview();
      }
    }
  }, [editor, setIsEditing]);

  const handleClick = useCallback(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (simpleMde.isPreviewActive()) {
        setIsEditing(true);
        simpleMde.togglePreview();
        (editor.current as any).render();
      }
    }
  }, [editor, setIsEditing]);

  useEffect(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (!simpleMde.isPreviewActive()) {
        simpleMde.togglePreview();
      }
    }
  }, [editor]);

  const handlePreview = useCallback(
    (easyMDE: EasyMDE) => {
      const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
      if (simpleMde && typeof simpleMde.togglePreview === 'function') {
        if (!simpleMde.isPreviewActive()) {
          setIsEditing(false);
          EasyMDE.togglePreview(easyMDE);
        }
      }
    },
    [editor, setIsEditing]
  );

  const toolbar = useMemo(() => {
    const previewBtn: ToolbarIcon = {
      action: handlePreview,
      className: 'fa fa-eye',
      name: 'preview',
      // noDisable: true,
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
   * @see https://github.com/Ionaru/easy-markdown-editor#readme - full version
   */
  return (
    <ClickAwayListener onClickAway={setPreviewMode}>
      <div onClick={handleClick}>
        <SimpleMDE
          ref={editor}
          onChange={input.onChange}
          value={input.value}
          options={{
            placeholder,
            spellChecker: false,
            status: isEditing,
            toolbar,
          }}
        />
      </div>
    </ClickAwayListener>
  );
};
