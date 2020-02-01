import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { postTaskTypeToProject } from '#/@store/projects';
import { routeProjectId } from '#/@store/router';
import { createRole, rolesList } from '#/@store/roles';
import { CreateFormJsx, ICreateFormProps } from './CreateForm';

const mapState = createStructuredSelector({
  items: rolesList,
  projectId: routeProjectId,
} as any);

const mapDispatch = {
  addItem: createRole,
  postTaskTypeToProject,
};

const CreateForm = connect<any, any, any>(
  mapState,
  mapDispatch
)(CreateFormJsx);

export { CreateForm, ICreateFormProps };
