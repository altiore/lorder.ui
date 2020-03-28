import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { createProjectRole } from '#/@store/project';
import { rolesList } from '#/@store/roles';
import { routeProjectId } from '#/@store/router';

import { CreateFormJsx, ICreateFormProps } from './CreateForm';

const mapState = createStructuredSelector({
  items: rolesList,
  projectId: routeProjectId,
} as any);

const mapDispatch = {
  addItem: createProjectRole,
};

const CreateForm = connect<any, any, any>(
  mapState,
  mapDispatch
)(CreateFormJsx);

export { CreateForm, ICreateFormProps };
