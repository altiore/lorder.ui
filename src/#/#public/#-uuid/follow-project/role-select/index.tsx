import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { publicProjectRoles } from '#/@store/publicProject';

import { RoleSelectTsx } from './role-select';

import { IProjectRole, IState } from '@types';

interface IMappedProps {
  items: IProjectRole[];
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  items: publicProjectRoles,
});

export default connect(mapStateToProps)(RoleSelectTsx);
