import { error } from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { SelectReactField } from 'src/components/SelectReactField';
import { getNewOption } from 'src/store/project';
import { getLabelForSelectField } from 'src/store/projects';
import { allTaskListWithoutDefProject, CREATE_USER_WORK_FORM_NAME, startUserWork, Task } from 'src/store/tasks';

const getValue = () => (opt: Task) => opt;
const isValidOption = () => (opt: Task) => opt.title;

const dot = (isNew = false) => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    alignItems: 'center',
    borderRadius: 10,
    color: '#000',
    content: isNew ? '"+"' : '"✓"',
    display: 'flex',
    height: 10,
    marginRight: 8,
    width: 10,
  },
});

const styles = () => ({
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isFocused ? '#EBEEF0' : 'inherit',
      ...dot(!data.id),
    };
  },
});

const mapStateToProps = createStructuredSelector({
  getLabel: getLabelForSelectField,
  getNewOption,
  getValue,
  isValid: isValid(CREATE_USER_WORK_FORM_NAME),
  isValidOption,
  options: allTaskListWithoutDefProject,
  styles,
});

const mapDispatch = {
  error,
  startUserWork: (task: Task) => startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

const mergeProps = ({ isValid, ...restState }: any, { error, startUserWork, ...restDispatch }: any, ownProps: any) => ({
  ...restState,
  ...restDispatch,
  ...ownProps,
  onSelect: (task: Task) => {
    if (isValid) {
      startUserWork(task);
    } else {
      error({
        message: 'Длина названия задачи не может превышать 140 символов',
        position: 'tc',
        title: 'Ошибка валидации!',
      });
    }
  },
});

export const TaskField = connect<{}, any, { name: string; component: any; label: string; className: string }>(
  mapStateToProps,
  mapDispatch,
  mergeProps
)(SelectReactField);
