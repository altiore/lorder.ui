import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { initialUpdateProject, updateProject } from '#/@store/projects';

import { reduxForm } from 'redux-form';

import { ProfileForm } from './ProfileForm';

const mapState = createStructuredSelector<any, any>({
  initialValues: initialUpdateProject,
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
    form: 'UpdateProjectForm',
  })(ProfileForm as any)
);
