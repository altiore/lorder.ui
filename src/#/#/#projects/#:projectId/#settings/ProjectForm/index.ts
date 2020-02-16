import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { initialUpdateProject, updateProject } from '#/@store/projects';
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
    form: 'UpdateProjectForm',
    enableReinitialize: true,
  })(ProfileForm as any)
);
