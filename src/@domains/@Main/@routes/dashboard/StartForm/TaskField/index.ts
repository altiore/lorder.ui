import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import { SelectReactField } from '@components/SelectReactField';
import { selectedProjectId } from '@store/project';
import { getProjectById, Project } from '@store/projects';
import { allTaskList, startUserWork, Task } from '@store/tasks';

// TODO: move to selector Performance Issue
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

// TODO: move to selector Performance Issue
const getNewOption = (state: IState) => (inputValue: string) =>
  new Task({ title: inputValue && inputValue, projectId: selectedProjectId(state) });
// TODO: move to selector Performance Issue
const getValue = () => (opt: Task) => opt;
// TODO: move to selector Performance Issue
const isValidOption = () => (opt: Task) => opt.title;

const mapStateToProps = createStructuredSelector({
  getLabel,
  getNewOption,
  getValue,
  isValidOption,
  options: allTaskList,
} as any);

const mapDispatch = {
  onSelect: (task: Task) => startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

export const TaskField = connect<{}, any, { name: string; component: any; label: string; className: string }>(
  mapStateToProps,
  mapDispatch
)(SelectReactField);
