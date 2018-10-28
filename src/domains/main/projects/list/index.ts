import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { selectProject } from 'src/store/project';
import { allProjectList, getAllProjects, getOwnProjects, ownProjectList, removeProject } from 'src/store/projects';
import { Projects as ProjectsJsx } from './Projects';
import { styles } from './styles';

const mapToState = (ownOnly: boolean = true) =>
  createStructuredSelector({
    projectList: ownOnly ? ownProjectList : allProjectList,
  });

const mapToProps = (ownOnly: boolean = true) => ({
  closeDialog,
  getProjects: ownOnly ? getOwnProjects : getAllProjects,
  goToPage: push,
  openDialog,
  removeProject,
  selectProject,
});

const mergeProps = (state: any, { goToPage, ...restDispatch }: any, { match, ...restOwn }: any) => ({
  ...state,
  ...restDispatch,
  goToProject: (id: number) => goToPage(`${match.url}/${id}`),
  ...restOwn,
});

export const OwnProjects = connect(
  mapToState(true),
  mapToProps(true),
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectsJsx));

export const AllProjects = connect(
  mapToState(false),
  mapToProps(false),
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectsJsx));
