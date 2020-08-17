import { push } from 'connected-react-router';

import { showWarning } from '#/@store/notifications';
import { selectedProject } from '#/@store/projects';

import { tryToCreateAndStart } from './tryToCreateAndStart';

import { IProject } from '@types';

export const goToProjectWithAsk = (project: IProject) => async (dispatch: any, getState: any) => {
  if (!project.id) {
    throw new Error('Не удалось распознать project.id в "goToProjectWithAsk"');
  }
  const selected = selectedProject(getState());

  if (selected?.id === project.id) {
    dispatch(push(`/projects/${project.id}`));
  } else {
    dispatch(push(`/projects/${project.id}`));

    dispatch(
      showWarning({
        action: {
          callback: async () => {
            await dispatch(tryToCreateAndStart(project.id as number));
          },
          label: 'Создать задачу',
        },
        message: `Хотите создать новую задачу для обзора?`,
        title: `Вы перешли к обзору проекта "${project.title}"`,
      })
    );
  }
};
