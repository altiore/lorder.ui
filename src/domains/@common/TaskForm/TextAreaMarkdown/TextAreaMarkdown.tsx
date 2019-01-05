import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as cn from 'classnames';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { WrappedFieldProps } from 'redux-form';

type TabsType = 'editor' | 'view';

export interface ITextAreaMarkdownProps extends WrappedFieldProps {
  classes: any;
  icon: React.ReactNode;
  title: string;
  onSave?: any;
}

export interface ITextAreaMarkdownState {
  active: boolean;
  activeTab: TabsType;
}

export class TextAreaMarkdownTsx extends React.Component<ITextAreaMarkdownProps, ITextAreaMarkdownState> {
  state = {
    active: false,
    activeTab: 'editor' as TabsType,
  };

  handleChange = (event: React.SyntheticEvent, activeTab: TabsType) => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, icon, input, title } = this.props;
    const { active, activeTab } = this.state;

    return (
      <div className={classes.root} onClick={active ? undefined : this.handleClick}>
        <div className={classes.header}>
          {icon}
          <Typography variant="h5" className={classes.headerTitle}>
            {title}
          </Typography>
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
                onChange={this.handleChange}
                classes={{ root: classes.tabsRoot, flexContainer: classes.tabsFlexContainer }}
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
                <Button onClick={this.handleSave} className={classes.saveButton}>
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
  }

  private handleClick = () => {
    this.setState({ active: true, activeTab: 'editor' });
  };

  private handleSave = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.setState({ active: false }, () => {
      if (typeof this.props.onSave === 'function') {
        this.props.onSave();
      }
    });
  };
}
