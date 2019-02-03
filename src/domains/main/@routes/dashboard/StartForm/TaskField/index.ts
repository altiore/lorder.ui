import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { SelectReactField } from 'src/components/SelectReactField';
import { getNewOption } from 'src/store/project';
import { getLabelForSelectField } from 'src/store/projects';
import { allTaskListWithoutDefProject, startUserWork, Task } from 'src/store/tasks';

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
  isValidOption,
  options: allTaskListWithoutDefProject,
  styles,
});

const mapDispatch = {
  onSelect: (task: Task) => startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

export const TaskField = connect<{}, any, { name: string; component: any; label: string; className: string }>(
  mapStateToProps,
  mapDispatch
)(SelectReactField);
