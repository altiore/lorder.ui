import React, { useCallback, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
import get from 'lodash/get';
import { Field, InjectedFormProps } from 'redux-form';
import { length, required } from 'redux-form-validators';
import TaskHistory from './task-history';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TextAreaMarkdown from '@components/text-area-markdown';
import { TextField } from '@components/text-field';

import TaskDuration from '#/@common/task-duration';
import { ITaskFormData, patchProjectTask, postProjectTask } from '#/@store/tasks';

import DialogHeader from './dialog-header';
import EstimationField from './estimation-field';
import ProjectPartsField from './project-parts-field';
import StatusField from './status-field';
import { useStyles } from './styles';
import TaskComments from './task-comments';
import TaskMembers from './task-members';

export interface ITaskFormProps extends InjectedFormProps<ITaskFormData, ITaskFormProps> {
  buttonText?: string;
  fetchTaskDetails: any;
  getEditTaskInitialValues: (p: number, seqN: number) => object;
  isCurrent: boolean;
  isPaused: boolean;
  location: any;
  onClose: any;
  projectId: number;
  push: any;
  sequenceNumber: number;
  startUserWork?: any;
  stopUserWork: any;
  fetchTaskComments: (projectId: number, taskId: number) => any;
  getTaskIdBySequenceNumber: any;
  addTaskComment: any;
}

const titleValidate = [
  required({ msg: 'Обязательное поле' }),
  length({ max: 140, msg: 'Превышен максимум 140 символов' }),
];

export const TaskFormJsx: React.FC<ITaskFormProps> = React.memo(
  ({
    buttonText = 'Сохранить',
    fetchTaskDetails,
    getEditTaskInitialValues,
    handleSubmit,
    initialValues,
    initialize,
    isCurrent,
    isPaused,
    location,
    onClose,
    pristine,
    projectId,
    push,
    sequenceNumber,
    startUserWork,
    submitting,
  }) => {
    const [currentSequenceNumber, setSequenceNumber] = useState(sequenceNumber);
    const [isCurrentState, setIsCurrentState] = useState(isCurrent);
    const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);
    const [initialD, setInitialD] = useState<Partial<ITaskFormData>>(initialValues);

    useEffect(() => {
      if (currentSequenceNumber && fetchTaskDetails && projectId) {
        fetchTaskDetails({ projectId, sequenceNumber: currentSequenceNumber });
      }
    }, [fetchTaskDetails, projectId, currentSequenceNumber]);

    useEffect(() => {
      if (projectId && sequenceNumber) {
        const initialData = getEditTaskInitialValues(projectId, sequenceNumber);
        if (initialData) {
          setInitialD(d => {
            // Только одна инициализация должна быть доступна при запуске.
            // Остальные избыточны и ухудшают производительность
            if (d) {
              return d;
            }
            initialize(initialData);
            return initialData;
          });
        }
      }
    }, [getEditTaskInitialValues, initialize, projectId, sequenceNumber]);

    // is this separate page or not? true - если это отдельная страница, а не окно
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

    const handleSaveBtnDisable = useCallback(() => {
      setDisabledSaveBtn(false);
    }, []);

    const saveAndClose = useCallback(
      async e => {
        if (await handleSave(e)) {
          if (!isPage) {
            handleClose();
          }
        }
      },
      [handleClose, handleSave, isPage]
    );

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

    const { actions, card, cardFirst, cardFirstNotPage, cardForm, cardSecond, durationBlock, grow } = useStyles();

    if (!initialD || !projectId) {
      return null;
    }

    return (
      <>
        <DialogHeader
          isPage={isPage}
          handleClose={handleClose}
          projectId={projectId}
          sequenceNumber={currentSequenceNumber}
        />
        <DialogContent className={card}>
          <form onSubmit={handleSave} className={cardForm}>
            <div className={cn(cardFirst, { [cardFirstNotPage]: !isPage })}>
              <Field
                placeholder="Заголовок задачи..."
                component={TextField}
                noLabel
                name="title"
                margin="normal"
                validate={titleValidate}
                variant="outlined"
                onSubmit={handleSave}
              />
              <Field
                placeholder="Описание задачи..."
                // onChangeCb используется для версии TextAreaHtml. Не удалять!!!
                onChangeCb={handleSaveBtnDisable}
                name="description"
                component={TextAreaMarkdown}
              />
              {currentSequenceNumber && <TaskHistory />}
            </div>
            <div className={cardSecond}>
              <StatusField
                onStart={handleStartTask}
                isCurrent={isCurrentState}
                projectId={projectId}
                sequenceNumber={currentSequenceNumber}
              />

              {initialD.id && (
                <div className={durationBlock}>
                  <TaskDuration taskId={initialD.id} />
                  <EstimationField projectId={projectId} />
                </div>
              )}

              {initialD.id && isPaused && <span>задача на паузе!</span>}

              <TaskMembers taskId={initialD.id} />

              <Field
                name="projectParts"
                label="Части проекта"
                component={ProjectPartsField}
                projectId={projectId}
                color="default"
                sequenceNumber={currentSequenceNumber}
              />
            </div>
            <button style={{ display: 'none' }} type="submit">
              Эта кнопка нужна, чтоб работало сохранение с клавиатуры
            </button>
          </form>
          <TaskComments />
        </DialogContent>

        <DialogActions key={'actions'} className={actions}>
          <div className={grow} />
          <Button
            color="primary"
            variant="contained"
            onClick={saveAndClose}
            disabled={submitting || (pristine && disabledSaveBtn)}
          >
            {buttonText}
            {submitting && '...'}
          </Button>
        </DialogActions>
      </>
    );
  }
);
