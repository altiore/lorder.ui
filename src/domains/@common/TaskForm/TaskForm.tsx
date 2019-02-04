import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import BugReportIcon from '@material-ui/icons/BugReport';
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ExtensionIcon from '@material-ui/icons/Extension';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NotesIcon from '@material-ui/icons/Notes';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';
import { TitleInput } from 'liw-components/TitleInput';

import { SelectMenuField } from 'src/components/SelectMenuField';
import { StartStopBtn } from 'src/components/StartStopBtn';
import { parseNumber } from 'src/store/@common/helpers';
import { STATUS_NAMES } from 'src/store/projects';
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
  classes?: any;
  fetchTaskDetails: any;
  isCurrent?: boolean;
  onClose: any;
  projectId: number;
  projectTasksIsLoading: boolean;
  replace: any;
  startUserWork?: any;
  stopUserWork: any;
  taskId?: number;
}

export interface ITaskFormState {
  anchorEl: React.ReactNode;
  invisible: boolean[];
}

export class TaskFormJsx extends React.PureComponent<ITaskFormProps, ITaskFormState> {
  state = {
    anchorEl: null,
    invisible: [true, true, true, true],
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
    this.timers.map(timer => {
      clearTimeout(timer);
    });
  }

  render() {
    const {
      buttonText = 'Сохранить',
      classes,
      initialValues,
      isCurrent,
      onClose,
      pristine,
      submitting,
      startUserWork,
      stopUserWork,
      taskId,
    } = this.props;
    const { invisible } = this.state;

    return (
      <>
        <DialogTitle disableTypography>
          <div className={classes.row}>
            <IconButton>
              {initialValues.typeId ? (
                <BugReportIcon className={classes.iconBug} />
              ) : (
                <ExtensionIcon className={classes.iconStory} />
              )}
            </IconButton>
            {taskId && (
              <>
                <Button variant="text" component="a" onClick={this.goToTask(taskId)} href="#">
                  <Typography>
                    A-
                    {taskId}
                  </Typography>
                </Button>
                <IconButton>
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.card}>
          <form onSubmit={this.handleSave()} className={classes.cardForm}>
            <div className={classes.cardFirst}>
              <Field
                bold
                icon={<EventIcon />}
                name="title"
                component={TitleInput}
                validate={[required({ msg: 'Обязательное поле' })]}
                onSubmit={this.handleSave(false)}
              />
              <Field
                icon={<NotesIcon fontSize="small" color="inherit" />}
                title={'Описание'}
                placeholder={'Введи ваше описание'}
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
                <Field name="users" component={PerformerField} taskId={1}>
                  {(count: number, onClick: () => void) => (
                    <IconButton aria-label={`${count} members`} className={classes.margin} onClick={onClick}>
                      <Badge badgeContent={count} color="secondary" invisible={invisible[0]}>
                        <GroupAddIcon fontSize="small" />
                      </Badge>
                    </IconButton>
                  )}
                </Field>
                <IconButton aria-label="4 events" className={classes.margin}>
                  <Badge badgeContent={4} color="secondary" invisible={invisible[1]}>
                    <EventAvailableIcon fontSize="small" />
                  </Badge>
                </IconButton>
                <IconButton aria-label="123 labels" className={classes.margin}>
                  <Badge badgeContent={12} color="secondary" invisible={invisible[2]}>
                    <TurnedInIcon fontSize="small" />
                  </Badge>
                </IconButton>
                {taskId && (
                  <>
                    <IconButton aria-label="more" className={classes.margin} onClick={this.moreMenuOpen}>
                      <Badge badgeContent={1} color="secondary" invisible={invisible[3]}>
                        <MoreHorizIcon fontSize="small" />
                      </Badge>
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
              </div>

              <Field name="value" component={Input} parse={parseNumber} label="Оценка задачи" type="number" />
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

  private handleSave = (isClose: boolean = true) => (e: React.SyntheticEvent) => {
    const { dirty, onClose } = this.props;
    if (dirty) {
      this.props.handleSubmit(e);
    }
    if (isClose && onClose) {
      onClose();
    }
  };

  private nullComponent() {
    return null;
  }

  private goToTask = (taskId: number) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.replace({
      pathname: `/projects/${this.props.projectId}/tasks/${taskId}`,
    });
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
