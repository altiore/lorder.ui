import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import SimpleMDE from 'react-simplemde-editor';

import cn from 'classnames';
import get from 'lodash/get';
import { WrappedFieldProps } from 'redux-form';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { ToolbarDropdownIcon, ToolbarIcon } from 'easymde';
import * as EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

import './custom-easymde.css';

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

const useStyles = makeStyles((theme: Theme) => ({
  edit: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    opacity: 0.2,
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  editHovered: {
    boxShadow: theme.shadow.secondary,
    opacity: 1,
  },
  root: {
    maxWidth: 740,
    position: 'relative',
  },
  toolbarStyle: {
    height: theme.spacing(5.5),
    opacity: 1,
    transition: theme.transitions.create(['border-color', 'height', 'opacity']),
  },
  toolbarStyleHidden: {
    borderColor: 'transparent',
    height: 0,
    opacity: 0,
  },
}));

export const TextAreaMarkdownTsx: React.FC<ITextAreaMarkdownProps> = ({ input, placeholder }) => {
  const { edit, editHovered, root, toolbarStyle, toolbarStyleHidden } = useStyles();

  const editor = useRef<SimpleMDEEditor>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [hovered, setHovered] = useState<boolean>(false);

  const handleOver = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleOut = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  const setPreviewMode = useCallback(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (!simpleMde.isPreviewActive()) {
        setIsEditing(false);
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
      }
    }
  }, [editor, setIsEditing]);

  useEffect(() => {
    const simpleMde = get(editor, ['current', 'simpleMde']) as ICurSimpleMDE;
    if (simpleMde && typeof simpleMde.togglePreview === 'function') {
      if (!simpleMde.isPreviewActive()) {
        simpleMde.togglePreview();
        const toolbarEl = get(editor.current, 'editorToolbarEl') as Element;
        toolbarEl.classList.add(toolbarStyle);
      }
    }
  }, [editor, toolbarStyle]);

  useEffect(() => {
    const toolbarEl = get(editor.current, 'editorToolbarEl') as Element;
    if (isEditing) {
      toolbarEl.classList.remove(toolbarStyleHidden);
    } else {
      toolbarEl.classList.add(toolbarStyleHidden);
    }
  }, [editor, isEditing, toolbarStyleHidden]);

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
      <div
        onClick={input.value ? undefined : handleClick}
        onDoubleClick={input.value ? handleClick : undefined}
        className={root}
        onMouseOver={handleOver}
        onMouseOut={handleOut}
      >
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
        {!isEditing && (
          <Tooltip title="Редактировать (двойной клик по тексту)">
            <IconButton className={cn(edit, { [editHovered]: hovered })} onClick={handleClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </ClickAwayListener>
  );
};
