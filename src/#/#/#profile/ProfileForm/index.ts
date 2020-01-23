import { ProfileForm } from './ProfileForm';
import { connect } from 'react-redux';
import { initialProfileFormData, updateProfile } from '#/@store/identity';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

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
    form: 'ProfileForm',
    enableReinitialize: true,
  })(ProfileForm as any)
);
