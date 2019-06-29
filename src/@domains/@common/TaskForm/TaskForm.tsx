import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Field, InjectedFormProps } from 'redux-form';
import { length, required } from 'redux-form-validators';

import { TextField } from '@components/TextField';
// import { TitleInput } from 'liw-components/TitleInput';

import { INotification } from '@types';
import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import Avatar from '@components/Avatar';
import { SelectMenuField } from '@components/SelectMenuField';
import { StartStopBtn } from '@components/StartStopBtn';
import { parseNumber } from '@store/@common/helpers';
import { STATUS_NAMES } from '@store/projects';
import { PerformerField } from './PerformerField';
import { TextAreaMarkdown } from './TextAreaMarkdown';

export interface ITaskFormData {
  isDetailsLoaded: boolean;
  id?: number;
  description?: string;
  title?: string;
  typeId?: number;
  projectId: number;
  value: number;
  status: number;
}

export interface ITaskFormProps extends InjectedFormProps<ITaskFormData, ITaskFormProps> {
  archiveTask: any;
  buttonText?: string;
  changeSettings?: any;
  classes?: any;
  fetchTaskDetails: any;
  isCurrent?: boolean;
  onClose: any;
  projectId: number;
  projectTasksIsLoading: boolean;
  push: any;
  replace: any;
  showSuccess: (args: INotification) => any;
  startUserWork?: any;
  stopUserWork: any;
  taskId?: number;
}

export interface ITaskFormState {
  anchorEl: React.ReactNode;
  invisible: boolean[];
  isShownCopy: boolean;
}

export class TaskFormJsx extends React.PureComponent<ITaskFormProps, ITaskFormState> {
  state = {
    anchorEl: null,
    invisible: [true, true, true, true],
    isShownCopy: false,
  };

  timers: any[] = [];

  componentDidMount(): void {
    const arr = this.state.invisible.slice(0);
    arr.forEach((inv: boolean, i: number) => {
      this.timers.push(
        setTimeout(() => {
          this.setState(({ invisible }: ITaskFormState) => ({
            invisible: [...invisible.slice(0, i), false, ...invisible.slice(i + 1)],
          }));
        }, 500 + i * 500)
      );
    });
    if (this.props.taskId && !this.props.initialValues.isDetailsLoaded) {
      this.props.fetchTaskDetails();
    }
  }

  componentWillUnmount(): void {
    this.timers.forEach(timer => {
      clearTimeout(timer);
    });
  }

  render() {
    const {
      buttonText = 'Сохранить',
      classes,
      initialValues,
      isCurrent,
      pristine,
      submitting,
      startUserWork,
      stopUserWork,
      taskId,
    } = this.props;
    const { invisible, isShownCopy } = this.state;

    const copyText = 'Скопировать ссылку на задачу';
    const isPage = this.isPage();
    return (
      <>
        <DialogTitle disableTypography>
          <div className={classes.row}>
            <IconButton>
              <TaskTypeIcon typeId={initialValues.typeId} />
            </IconButton>
            {taskId && (
              <div onMouseLeave={this.hideCopy}>
                <Tooltip title={isPage ? copyText : 'Открыть в отдельном окне'} placement="bottom">
                  <Button
                  // variant="text"
                  // component={isPage ? undefined : 'a'}
                  // href={isPage ? undefined : '#'}
                  // onClick={this.goToTask()}
                  // onMouseOver={this.showCopy}
                  >
                    #{taskId}
                  </Button>
                </Tooltip>
                {!isPage && isShownCopy && (
                  <Tooltip title={copyText} placement="right">
                    <CopyToClipboard text={this.getLink(true)} onCopy={this.copyToClipboard}>
                      <IconButton onClick={this.copyToClipboard}>
                        <FileCopyIcon fontSize="small" />
                      </IconButton>
                    </CopyToClipboard>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
          <div>
            {taskId && (
              <>
                <IconButton aria-label="more" className={classes.margin} onClick={this.moreMenuOpen}>
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  classes={{ paper: classes.menu }}
                >
                  <MenuItem onClick={this.onArchiveTask}>Архивировать задачу</MenuItem>
                </Menu>
              </>
            )}
            <IconButton onClick={this.onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className={classes.card}>
          <form onSubmit={this.handleSave()} className={classes.cardForm}>
            <div className={classes.cardFirst}>
              <Field
                // bold
                name="title"
                placeholder="Заголовок задачи..."
                component={TextField}
                validate={[
                  required({ msg: 'Обязательное поле' }),
                  length({ max: 140, msg: 'Превышен максимум 140 символов' }),
                ]}
                onSubmit={this.handleSave(false)}
              />
              <Field
                placeholder="Описание задачи..."
                name="description"
                component={TextAreaMarkdown}
                onSave={this.handleSave(false)}
              />
            </div>
            <div className={classes.cardSecond}>
              <Field
                name="status"
                component={SelectMenuField}
                IconComponent={this.nullComponent}
                fullWidth
                label="Status"
                type="number"
              >
                {STATUS_NAMES.map((status, i) => (
                  <MenuItem key={i} value={i}>
                    {status}
                  </MenuItem>
                ))}
              </Field>
              <div>
                <Field name="performer" component={PerformerField} taskId={taskId}>
                  {(count: number, onClick: () => void) => <Avatar onClick={onClick}>{count}</Avatar>}
                </Field>
                <Field name="users" component={PerformerField} taskId={taskId}>
                  {(count: number, onClick: () => void) => (
                    <IconButton aria-label={`${count} members`} className={classes.margin} onClick={onClick}>
                      <Badge badgeContent={count} color="secondary" invisible={invisible[0]}>
                        <GroupAddIcon fontSize="small" />
                      </Badge>
                    </IconButton>
                  )}
                </Field>
              </div>

              <Field name="value" component={TextField} parse={parseNumber} label="Оценка задачи" type="number" />
            </div>
            <button style={{ display: 'none' }} type="submit">
              Эта кнопка нужна, чтоб работало сохранение с клавиатуры
            </button>
          </form>
        </DialogContent>
        <DialogActions key={'actions'} className={classes.actions}>
          {isCurrent !== undefined && (
            <StartStopBtn isStarted={isCurrent} onStart={startUserWork} onStop={stopUserWork} />
          )}
          <div className={classes.grow} />
          <Button color="primary" variant="contained" onClick={this.handleSave()} disabled={submitting || pristine}>
            {buttonText}
            {submitting && '...'}
          </Button>
        </DialogActions>
      </>
    );
  }

  private showCopy = () => {
    this.setState({ isShownCopy: true });
  };

  private hideCopy = () => {
    this.setState({ isShownCopy: false });
  };

  private handleSave = (isClose: boolean = true) => (e: React.SyntheticEvent) => {
    const { dirty, valid, onClose } = this.props;
    if (dirty && valid) {
      this.props.handleSubmit(e);
    }
    if (isClose && onClose && valid) {
      onClose();
    }
  };

  private nullComponent() {
    return null;
  }

  private onClose = () => {
    if (this.isPage()) {
      this.props.push('/');
    } else {
      this.props.onClose();
    }
  };

  private getLink = (absolute: boolean = false) => {
    const path = `/projects/${this.props.projectId}/tasks/${this.props.taskId}`;
    if (absolute) {
      return window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + path;
    }
    return path;
  };

  private isPage = () => {
    return this.props.hasOwnProperty('location');
  };

  private goToTask = () => (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (this.isPage()) {
      this.copyToClipboard();
    } else {
      // this.props.changeSettings({ fullScreen: true });
      this.props.replace({
        pathname: this.getLink(false),
      });
    }
  };

  private copyToClipboard = (e?: React.SyntheticEvent | string) => {
    if (e) {
      if (typeof e === 'string') {
        this.props.showSuccess({
          message: 'Ссылка на задачу скопирована в буфер обмена!',
          title: e,
        });
      }
    } else {
      this.props.showSuccess({
        message: 'Ссылка на задачу скопирована в буфер обмена!',
        title: this.getLink(true),
      });
    }
  };

  private moreMenuOpen = (event: React.SyntheticEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => this.setState({ anchorEl: null });

  private onArchiveTask = () => {
    const { archiveTask, onClose } = this.props;
    if (onClose) {
      onClose();
    }
    archiveTask();
  };
}
