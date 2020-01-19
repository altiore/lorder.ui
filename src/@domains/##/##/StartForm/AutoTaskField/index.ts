import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { ITask } from '@types';
import { showError } from '@store/notifications';
import { getProjectById, ownProjectList } from '@store/projects';
import { allTaskListWithoutDefProject, CREATE_USER_WORK_FORM_NAME, startUserWork } from '@store/tasks';
import { currentProjectId } from '@store/timer';
import { AutoTaskFieldTsx } from './AutoTaskField';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getProjectById,
  isValid: isValid(CREATE_USER_WORK_FORM_NAME),
  projectId: currentProjectId,
  projects: ownProjectList,
  suggestions: allTaskListWithoutDefProject,
} as any);

const mapDispatch = {
  showError,
  startUserWork: (task: ITask) =>
    startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

const mergeProps = (
  { isValid, ...restState }: any,
  { showError, startUserWork, ...restDispatch }: any,
  ownProps: any
) => ({
  ...restState,
  ...restDispatch,
  ...ownProps,
  onSelect: (task: ITask) => {
    if (isValid) {
      startUserWork(task);
    } else {
      showError({
        message: 'Длина названия задачи не может превышать 140 символов',
        position: 'tc',
        title: 'Ошибка валидации!',
      });
    }
  },
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(AutoTaskFieldTsx));
