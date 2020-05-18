import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import cn from 'classnames';
import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

type TabsType = 'editor' | 'view';

export interface ITextAreaMarkdownProps extends WrappedFieldProps {
  classes: any;
  icon?: React.ReactNode;
  title?: string;
  placeholder?: string;
  onSave?: any;
}

export const TextAreaMarkdownTsx: React.FC<ITextAreaMarkdownProps> = ({
  classes,
  icon,
  input,
  onSave,
  placeholder,
  title,
}) => {
  let text: any;
  try {
    text = JSON.parse(input.value);
  } catch (e) {
    text = input.value;
  }

  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState('editor' as TabsType);
  const [editorState, setEditorState] = React.useState(() => {
    return EditorState.createWithContent(convertFromRaw(text));
  });

  const handleChange = useCallback(
    (event: React.SyntheticEvent, activeTab: TabsType) => {
      setActiveTab(activeTab);
    },
    [setActiveTab]
  );

  const handleClick = useCallback(() => {
    setActive(true);
    setActiveTab('editor');
  }, [setActive, setActiveTab]);

  const handleSave = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      setActive(false);
      if (typeof onSave === 'function') {
        onSave();
      }
    },
    [onSave]
  );

  const SyncWithRefuxFormAndSave = async (e: React.SyntheticEvent) => {
    await input.onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    handleSave(e);
  };

  const handleEditorState = async (value: any) => {
    setEditorState(value);
  };

  if (!input.value && !active) {
    return (
      <div className={classes.root}>
        <ButtonBase className={classes.button} onClick={handleClick}>
          {placeholder || 'Добавьте описание...'}
        </ButtonBase>
      </div>
    );
  }
  return (
    <div className={classes.root} onClick={active ? undefined : handleClick}>
      <div className={classes.header}>
        {!!icon && icon}
        {!!title && (
          <Typography variant="h4" className={classes.headerTitle}>
            {title}
          </Typography>
        )}
      </div>
      <div
        className={cn(classes.main, {
          [classes.mainActive]: active,
        })}
      >
        {active ? (
          <>
            <Tabs
              value={activeTab}
              onChange={handleChange as any}
              classes={{
                flexContainer: classes.tabsFlexContainer,
                indicator: classes.tabsIndicator,
                root: classes.tabsRoot,
              }}
            >
              <Tab icon={<CodeIcon fontSize="small" />} value="editor" classes={{ root: classes.tabRoot }} />
              <Tab icon={<VisibilityIcon fontSize="small" />} value="view" classes={{ root: classes.tabRoot }} />
            </Tabs>
            <div className={classes.content}>
              {activeTab === 'view' && (
                <Editor editorState={editorState} toolbarHidden onEditorStateChange={handleEditorState} />
              )}
              {activeTab === 'editor' && (
                <div style={{ background: 'white', minHeight: 30 }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorState}
                    toolbar={{
                      inline: { inDropdown: true },
                      link: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                    }}
                  />
                </div>
              )}
              <Button variant="outlined" onClick={SyncWithRefuxFormAndSave} className={classes.saveButton}>
                Сохранить
              </Button>
            </div>
          </>
        ) : (
          <Editor editorState={editorState} onEditorStateChange={handleEditorState} />
        )}
      </div>
    </div>
  );
};
