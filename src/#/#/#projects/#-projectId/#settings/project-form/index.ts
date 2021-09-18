import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { userRole } from '#/@store/identity';
import { initialUpdateProject, UPDATE_PROJECT_FORM, updateProject } from '#/@store/projects';

import { ProjectFormTsx } from './project-form';

import { IState, ROLE } from '@types';

const mapState = createStructuredSelector<IState, { initialValues: any; userRole: ROLE }>({
  initialValues: initialUpdateProject,
  userRole,
});

const mapDispatch = {
  onSubmit: updateProject,
};

export default connect(
  mapState,
  mapDispatch
)(
  reduxForm({
    enableReinitialize: true,
    form: UPDATE_PROJECT_FORM,
    onChange(values: any) {
      console.log('values is', values);
    },
  })(ProjectFormTsx as any)
);
