import React from 'react';

import PauseSvg from '@material-ui/icons/PauseRounded';

import ConfirmationModal, { ACTION_TYPE } from '@components/confirmation-modal';
import CheckSvg from '@components/start-stop-button/svg/check';

import { openDialog } from '#/@store/dialog';
import { defaultProjectId } from '#/@store/identity';
import { currentTask, currentUserWorkId } from '#/@store/timer';
import { getUserWorkById } from '#/@store/user-works';

import { palette } from '@styles/themes/light/palette';

import { createAndStart, pauseWork } from './actionUserWork';

import { IState, ITask } from '@types';

const svgStyle = {
  color: palette.pause.main,
  margin: '0 8px 0 -4px',
};

const checkSvgStyle = {
  ...svgStyle,
  color: palette.success.main,
  fontSize: 20,
};

export const tryToCreateAndStart = (projectId: number) => async (dispatch: any, getState: () => IState) => {
  const state = getState();
  const task: ITask = currentTask(state);
  const userWork = getUserWorkById(state)(currentUserWorkId(state) as number);
  if (task && task?.id === userWork?.taskId) {
    // задача НЕ на паузе
    if (task.projectId !== defaultProjectId(state)) {
      // текущая задача не завершена
      dispatch(
        openDialog(
          ConfirmationModal,
          {},
          {
            action: ACTION_TYPE.INFO,

            cancelText: (
              <>
                <CheckSvg style={checkSvgStyle} />
                <span>Завершить</span>
              </>
            ),
            onCancel: () => createAndStart(projectId)(dispatch, getState),

            confirmText: (
              <>
                <PauseSvg style={svgStyle} />
                <span>Поставить на паузу</span>
              </>
            ),
            onConfirm: () =>
              (async () => {
                await pauseWork()(dispatch, getState);
                await createAndStart(projectId)(dispatch, getState);
              })(),

            text: `"${task.title}"`,
            titleText: 'Что с задачей?',
            warningText: 'Сегодня замечательный день!',
          }
        )
      );

      return;
    }
  }

  return await createAndStart(projectId)(dispatch, getState);
};
