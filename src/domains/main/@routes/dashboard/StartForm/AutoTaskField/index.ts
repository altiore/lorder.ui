import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { ITask } from 'src/@types';
import { showError } from 'src/store/notifications';
import { getProjectById } from 'src/store/projects';
import { allTaskListWithoutDefProject, CREATE_USER_WORK_FORM_NAME, startUserWork } from 'src/store/tasks';
import { currentProjectId } from 'src/store/timer';
import { AutoTaskFieldTsx } from './AutoTaskField';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getProjectById,
  isValid: isValid(CREATE_USER_WORK_FORM_NAME),
  projectId: currentProjectId,
  suggestions: allTaskListWithoutDefProject,
});

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
