import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { initialProfileFormData, updateProfile } from '#/@store/identity';

import { ProfileForm } from './profile-form';

const mapState = createStructuredSelector<any, any>({
  initialValues: initialProfileFormData,
});

const mapDispatch = {
  onSubmit: updateProfile,
};

export default connect(
  mapState,
  mapDispatch
)(
  reduxForm({
    enableReinitialize: true,
    form: 'ProfileForm',
  })(ProfileForm as any)
);
