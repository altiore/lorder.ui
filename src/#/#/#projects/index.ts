import { push } from 'connected-react-router';
import { error } from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { closeDialog, openDialog } from '#/@store/dialog';
import { defaultProjectId, hasRole, userRole } from '#/@store/identity';
import {
  acceptInvitation,
  fetchAllParticipantProjects,
  ownProjectList,
  removeProject,
  removeProjectByAdmin,
} from '#/@store/projects';
import { findUserById } from '#/#/@store/users';
import { Projects as ProjectsJsx } from './Projects';

const mapToState = (ownOnly: boolean = true) =>
  createStructuredSelector({
    defaultProjectId,
    findUserById,
    hasRole,
    ownOnly: () => ownOnly,
    projectList: ownProjectList,
    userRole,
  } as any);

const mapToProps = (ownOnly: boolean = true) => ({
  acceptInvitation,
  closeDialog,
  getProjects: fetchAllParticipantProjects,
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

export default connect(
  mapToState(true),
  mapToProps(true),
  mergeProps
)(withResize(ProjectsJsx));