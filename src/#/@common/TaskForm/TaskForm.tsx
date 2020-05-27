import React, { useCallback, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
import get from 'lodash/get';
import { Field, InjectedFormProps } from 'redux-form';
import { length, required } from 'redux-form-validators';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import InputField from '@components/InputField';
import TextAreaMarkdown from '@components/TextAreaMarkdown';
import { TextField } from '@components/TextField';

import TaskDuration from '#/@common/TaskDuration';
import { parseNumber } from '#/@store/@common/helpers';
import { patchProjectTask, postProjectTask } from '#/@store/tasks';

import DialogHeader from './DialogHeader';
import ProjectPartsField from './ProjectPartsField';
import StatusField from './StatusField';
import { useStyles } from './styles';
import TaskHistory from './TaskHistory';

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
  startUserWork?: any;
  stopUserWork: any;
}

const titleValidate = [
  required({ msg: 'Обязательное поле' }),
  length({ max: 140, msg: 'Превышен максимум 140 символов' }),
];

export const TaskFormJsx: React.FC<ITaskFormProps> = ({
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
  startUserWork,
  submitting,
}) => {
  const [currentSequenceNumber, setSequenceNumber] = useState(sequenceNumber);

  const [isCurrentState, setIsCurrentState] = useState(isCurrent);

  const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);

  useEffect(() => {
    if (currentSequenceNumber) {
      fetchTaskDetails({ projectId, sequenceNumber: currentSequenceNumber });
    }
  }, [fetchTaskDetails, projectId, currentSequenceNumber]);

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
        handleClose();
      }
    },
    [handleClose, handleSave]
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

  const { actions, card, cardFirst, cardFirstNotPage, cardForm, cardSecond, grow, valueWrap } = useStyles();

  return (
    <>
      <DialogHeader
        isPage={isPage}
        handleClose={handleClose}
        projectId={projectId}
        sequenceNumber={currentSequenceNumber}
        typeId={initialValues.typeId}
      />
      <DialogContent className={card}>
        <form onSubmit={handleSave} className={cardForm}>
          <div className={cn(cardFirst, { [cardFirstNotPage]: !isPage })}>
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

            <div className={valueWrap}>
              <Field name="value" component={InputField} parse={parseNumber} label="Оценка задачи" type="number" />
            </div>
            {initialValues.id && (
              <div>
                {isPaused && 'задача на паузе!'}
                <TaskDuration taskId={initialValues.id} />
              </div>
            )}
            <Field
              name="projectParts"
              label="Части проекта"
              component={ProjectPartsField}
              projectId={projectId}
              sequenceNumber={currentSequenceNumber}
            />
          </div>
          <button style={{ display: 'none' }} type="submit">
            Эта кнопка нужна, чтоб работало сохранение с клавиатуры
          </button>
        </form>
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
};
