import { connect } from 'react-redux';

import { IState } from 'src/@types';
import { ISelectReactFieldProps, SelectReactField } from 'src/domains/@common/SelectReactField';
import { selectedProjectId } from 'src/store/project';
import { getProjectById, Project } from 'src/store/projects';
import { allTaskList, startUserWork, Task } from 'src/store/tasks';

function getLabel(state: IState) {
  return (task: Task & { project: Project }) => {
    const project = getProjectById(state)(task.projectId);
    const projectInfo = project.title ? ` (${project.title})` : ' (Без проекта)';
    if (task.id) {
      return task.title + projectInfo;
    } else {
      return `Создать: "${task.title}${projectInfo}"`;
    }
  };
}

const mapStateToProps = (state: IState) => ({
  getLabel: getLabel(state),
  getNewOption: (inputValue: string) =>
    new Task({ title: inputValue && inputValue, projectId: selectedProjectId(state) }),
  getValue: (opt: Task) => opt,
  isValidOption: (opt: Task) => opt.title,
  options: allTaskList(state),
});

const mapDispatch = {
  onSelect: (task: Task) => startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

export const TaskField = connect<any, any, ISelectReactFieldProps>(
  mapStateToProps,
  mapDispatch
)(SelectReactField);
