import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { WrappedFieldProps } from 'redux-form';

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
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState('editor' as TabsType);

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
                <ReactMarkdown source={input.value} className={cn(classes.markdown, classes.markdownNested)} />
              )}
              {activeTab === 'editor' && (
                <TextareaAutosize className={classes.editor} autoFocus minRows={5} maxRows={30} {...input} />
              )}
              <Button variant="outlined" onClick={handleSave} className={classes.saveButton}>
                Сохранить
              </Button>
            </div>
          </>
        ) : (
          <ReactMarkdown source={input.value} className={classes.markdown} />
        )}
      </div>
    </div>
  );
};
