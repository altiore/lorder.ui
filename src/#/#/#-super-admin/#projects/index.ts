import { error } from 'react-notification-system-redux';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { findUserById } from '#/#/@store/users';
import { closeDialog, openDialog } from '#/@store/dialog';
import { defaultProjectId, hasRole, userRole } from '#/@store/identity';
import { allProjectList, getAllProjects, removeProject, removeProjectByAdmin } from '#/@store/projects';

import { ProjectsTsx } from './projects';

import { IState } from '@types';

interface IMapped {
  defaultProjectId: any;
  findUserById: any;
  hasRole: any;
  projectList: any;
  userRole: any;
}

const mapToState = createStructuredSelector<IState, IMapped>({
  defaultProjectId,
  findUserById,
  hasRole,
  projectList: allProjectList,
  userRole,
});

const mapToProps = {
  closeDialog,
  getProjects: getAllProjects,
  goToPage: push,
  openDialog,
  removeProject,
  removeProjectByAdmin,
  showError: error,
};

const mergeProps = (state: any, { goToPage, ...restDispatch }: any, { match, ...restOwn }: any) => ({
  ...state,
  ...restDispatch,
  goToProject: (id: number) => goToPage(`${match.url}/${id}`),
  ...restOwn,
});

export default connect(mapToState, mapToProps, mergeProps)(ProjectsTsx);
