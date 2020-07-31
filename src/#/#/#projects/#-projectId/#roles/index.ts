import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  createProjectRole,
  deleteProjectRole,
  editProjectRole,
  fetchProjectRoles,
  projectRoles,
} from '#/@store/project';
import { openedAccessLevel } from '#/@store/projects';
import { fetchRoles, rolesList } from '#/@store/roles';

import { ProjectRolesJsx } from './project.roles';

import { ACCESS_LEVEL, IState } from '@types';

interface IMappedProps {
  openedAccessLevel?: ACCESS_LEVEL;
  projectRoles: any;
  rolesList: any;
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  openedAccessLevel,
  projectRoles,
  rolesList,
});

const mapDispatch = {
  createProjectRole,
  deleteProjectRole,
  editProjectRole,
  fetchProjectRoles,
  fetchRoles,
};

export default connect(mapState, mapDispatch)(ProjectRolesJsx);
