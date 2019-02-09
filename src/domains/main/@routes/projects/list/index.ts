import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { error } from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'src/hocs/withResize';
import { closeDialog, openDialog } from 'src/store/dialog';
import { defaultProjectId, hasRole, userRole } from 'src/store/identity';
import {
  acceptInvitation,
  allProjectList,
  getAllProjects,
  getOwnProjects,
  ownProjectList,
  removeProject,
  removeProjectByAdmin,
} from 'src/store/projects';
import { findUserById } from 'src/store/users';
import { Projects as ProjectsJsx } from './Projects';
import { styles } from './styles';

const mapToState = (ownOnly: boolean = true) =>
  createStructuredSelector({
    defaultProjectId,
    findUserById,
    hasRole,
    ownOnly: () => ownOnly,
    projectList: ownOnly ? ownProjectList : allProjectList,
    userRole,
  });

const mapToProps = (ownOnly: boolean = true) => ({
  acceptInvitation,
  closeDialog,
  getProjects: ownOnly ? getOwnProjects : getAllProjects,
  goToPage: push,
  openDialog,
  removeProject,
  removeProjectByAdmin,
  showError: error,
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
)(withResize(withStyles(styles, { withTheme: true })(ProjectsJsx)));

export const AllProjects = connect(
  mapToState(false),
  mapToProps(false),
  mergeProps
)(withResize(withStyles(styles, { withTheme: true })(ProjectsJsx)));
