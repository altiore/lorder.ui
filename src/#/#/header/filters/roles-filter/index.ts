import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { openedProjectUserRoles } from '#/@store/projects';
import { changeFilter, selectedProjectRole } from '#/@store/tasksFilter';

import { RolesFilter } from './roles-filter';

import { IDetailedRole, IState } from '@types';

interface MappedProps {
  selectedRole?: string;
  userRoles: IDetailedRole[];
}

const mapStateToProps = createStructuredSelector<IState, MappedProps>({
  selectedRole: selectedProjectRole,
  userRoles: openedProjectUserRoles,
});

const mapDispatchToProps = {
  changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesFilter);
