import get from 'lodash-es/get';
import { connect } from 'react-redux';

import { IState } from 'src/@types';
import { ISelectReactFieldProps, SelectReactField } from 'src/domains/@common/SelectReactField';
import { getProjectById, Project } from 'src/store/projects';
import { allTaskList, startUserWork, Task } from 'src/store/tasks';

const mapStateToProps = (state: IState) => ({
  getLabel: (opt: Task & { project: Project }) =>
    opt && opt.title + ` (${get(getProjectById(state)(opt.projectId), 'title')})`,
  getValue: (opt: Task) => opt,
  options: allTaskList(state),
});

const mapDispatch = {
  onSelect: (task: Task) => startUserWork({ taskId: task.id, projectId: task.projectId }),
};

export const TaskField = connect<any, any, ISelectReactFieldProps>(
  mapStateToProps,
  mapDispatch
)(SelectReactField);
