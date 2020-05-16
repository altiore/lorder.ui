import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import get from 'lodash/get';
import includes from 'lodash/includes';
import { Field, InjectedFormProps } from 'redux-form';
import { length, required } from 'redux-form-validators';

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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import InputField from '@components/InputField';
import { TextField } from '@components/TextField';

import TaskDuration from '#/@common/TaskDuration';
import { parseNumber } from '#/@store/@common/helpers';
import { TASKS_ROUTE } from '#/@store/router';
import { patchProjectTask, postProjectTask } from '#/@store/tasks';

import StatusField from './StatusField';
import { useStyles } from './styles';
import TaskHistory from './TaskHistory';
import { TextAreaMarkdown } from './TextAreaMarkdown';

import { INotification } from '@types';

export interface ITaskFormData {
  isDetailsLoaded: boolean;
  id?: number;
  description?: string;
  title?: string;
  typeId?: number;
  projectId: number;
  value: number;
  sequenceNumber: number;
  status: number;
}

export interface ITaskFormProps extends InjectedFormProps<ITaskFormData, ITaskFormProps> {
  archiveTask: any;
  buttonText?: string;
  changeSettings?: any;
  classes?: any;
  fetchTaskDetails: any;
  isCurrent?: boolean;
  isPaused: boolean;
  location: any;
  onClose: any;
  projectId: number;
  push: any;
  sequenceNumber: number;
  showSuccess: (args: INotification) => any;
  startUserWork?: any;
  stopUserWork: any;
}

const timers: any[] = [];

const titleValidate = [
  required({ msg: 'Обязательное поле' }),
  length({ max: 140, msg: 'Превышен максимум 140 символов' }),
];

export const TaskFormJsx: React.FC<ITaskFormProps> = ({
  archiveTask,
  buttonText = 'Сохранить',
  fetchTaskDetails,
  handleSubmit,
  initialValues,
  isCurrent,
  isPaused,
  location,
  onClose,
  pristine,
  projectId,
  push,
  sequenceNumber,
  showSuccess,
  startUserWork,
  submitting,
}) => {
  const classes = useStyles();

  const [currentSequenceNumber, setSequenceNumber] = useState(sequenceNumber);

  const [isCurrentState, setIsCurrentState] = useState(isCurrent);

  const [invisible, setInvisible] = useState([true, true, true, true]);
  useEffect(() => {
    const arr = invisible.slice(0);
    arr.forEach((inv: boolean, i: number) => {
      const timer = setTimeout(() => {
        setInvisible(invisible => [...invisible.slice(0, i), false, ...invisible.slice(i + 1)]);
      }, 500 + i * 500);
      timers.push(timer);
    });
    return () => {
      timers.forEach(timer => {
        clearTimeout(timer);
      });
    };
  }, [invisible, setInvisible]);

  useEffect(() => {
    if (currentSequenceNumber) {
      fetchTaskDetails({ projectId, sequenceNumber: currentSequenceNumber });
    }
  }, [fetchTaskDetails, projectId, currentSequenceNumber]);

  /** show copy block */
  const [isShownCopy, setIsShowCopy] = useState(false);
  const showCopy = useCallback(() => {
    setIsShowCopy(true);
  }, [setIsShowCopy]);
  const hideCopy = useCallback(() => {
    setIsShowCopy(false);
  }, [setIsShowCopy]);
  /** end show copy block */

  // is this separate page or not?
  const isPage = useMemo(() => {
    return Boolean(location);
  }, [location]);

  const handleClose = useCallback(() => {
    if (isPage) {
      push('/');
    } else {
      onClose();
    }
  }, [isPage, onClose, push]);

  const handleSave = useCallback(
    async (e: React.SyntheticEvent) => {
      const res: any = await handleSubmit(e);
      if (res && [postProjectTask.success, patchProjectTask.success].includes(res.type)) {
        return res;
      }
      return false;
    },
    [handleSubmit]
  );

  const saveAndClose = useCallback(
    async e => {
      if (await handleSave(e)) {
        handleClose();
      }
    },
    [handleClose, handleSave]
  );

  const getLink = useCallback(
    (absolute: boolean = false) => {
      const path = `${TASKS_ROUTE(projectId)}/${currentSequenceNumber}`;
      if (absolute) {
        const port = includes(['443', '80', ''], window.location.port)
          ? window.location.port
          : ':' + window.location.port;
        return window.location.protocol + '//' + window.location.hostname + port + path;
      }
      return path;
    },
    [projectId, currentSequenceNumber]
  );

  const copyToClipboard = useCallback(
    (link: string) => {
      showSuccess({
        message: 'Ссылка на задачу скопирована в буфер обмена!',
        title: link,
      });
    },
    [showSuccess]
  );

  const goToTask = useCallback((link: string) => {
    window.open(link, '_blank');
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const moreMenuOpen = useCallback(
    (event: React.SyntheticEvent) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const moreMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  const onArchiveTask = useCallback(() => {
    archiveTask({ sequenceNumber: currentSequenceNumber, projectId });
    if (handleClose) {
      handleClose();
    }
  }, [archiveTask, handleClose, projectId, currentSequenceNumber]);

  const handleStartTask = useCallback(
    async e => {
      setIsCurrentState(true);
      if (currentSequenceNumber) {
        await startUserWork({
          projectId,
          sequenceNumber: currentSequenceNumber,
        });
      } else {
        const res = await handleSave(e);
        if (res) {
          const newSequenceNumber = get(res, ['payload', 'data', 'sequenceNumber']);
          const newProjectId = get(res, ['payload', 'data', 'projectId']);

          if (newSequenceNumber && newProjectId) {
            await startUserWork({
              projectId: newProjectId,
              sequenceNumber: newSequenceNumber,
            });
            setSequenceNumber(newSequenceNumber);
          }
        }
      }
    },
    [currentSequenceNumber, handleSave, projectId, setIsCurrentState, setSequenceNumber, startUserWork]
  );

  const copyText = 'Скопировать ссылку на задачу';

  return (
    <>
      <DialogTitle disableTypography>
        <div className={classes.row}>
          <IconButton>
            <TaskTypeIcon typeId={initialValues.typeId} />
          </IconButton>
          {currentSequenceNumber && (
            <div onMouseLeave={hideCopy} onMouseOver={isPage ? undefined : showCopy}>
              <Tooltip title={isPage ? copyText : 'Открыть в отдельном окне'} placement="bottom">
                <CopyToClipboard text={getLink(true)} onCopy={isPage ? copyToClipboard : goToTask}>
                  <Button variant="text">#{currentSequenceNumber}</Button>
                </CopyToClipboard>
              </Tooltip>
              {!isPage && isShownCopy && (
                <Tooltip title={copyText} placement="right">
                  <CopyToClipboard text={getLink(true)} onCopy={copyToClipboard}>
                    <IconButton>
                      <FileCopyIcon fontSize="small" />
                    </IconButton>
                  </CopyToClipboard>
                </Tooltip>
              )}
            </div>
          )}
        </div>
        <div>
          {currentSequenceNumber && (
            <>
              <IconButton aria-label="more" className={classes.margin} onClick={moreMenuOpen}>
                <MoreHorizIcon fontSize="small" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={moreMenuClose}>
                <MenuItem onClick={onArchiveTask}>Архивировать задачу</MenuItem>
              </Menu>
            </>
          )}
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={classes.card}>
        <form onSubmit={handleSave} className={classes.cardForm}>
          <div className={classes.cardFirst}>
            <Field
              name="title"
              placeholder="Заголовок задачи..."
              component={TextField}
              margin="normal"
              validate={titleValidate}
              onSubmit={handleSave}
            />
            <Field
              placeholder="Описание задачи..."
              name="description"
              component={TextAreaMarkdown}
              onSave={handleSave}
            />
            {currentSequenceNumber && <TaskHistory />}
          </div>
          <div className={classes.cardSecond}>
            <StatusField isMine onStart={handleStartTask} isCurrent={isCurrentState} />

            <div className={classes.valueWrap}>
              <Field name="value" component={InputField} parse={parseNumber} label="Оценка задачи" type="number" />
            </div>
            {initialValues.id && (
              <div>
                {isPaused && 'задача на паузе!'}
                <TaskDuration taskId={initialValues.id} />
              </div>
            )}
          </div>
          <button style={{ display: 'none' }} type="submit">
            Эта кнопка нужна, чтоб работало сохранение с клавиатуры
          </button>
        </form>
      </DialogContent>
      <DialogActions key={'actions'} className={classes.actions}>
        <div className={classes.grow} />
        <Button color="primary" variant="contained" onClick={saveAndClose} disabled={submitting || pristine}>
          {buttonText}
          {submitting && '...'}
        </Button>
      </DialogActions>
    </>
  );
};
