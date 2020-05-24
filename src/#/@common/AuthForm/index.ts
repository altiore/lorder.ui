import { connect } from 'react-redux';

import { clearAsyncError } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { isMagicLoginForm, toggleUiSetting } from '#/@store/ui';

import { AuthForm } from './AuthForm';

const mapState = createStructuredSelector({
  isMagicLoginForm: isMagicLoginForm as any,
});

const mapDispatch = {
  clearErrors: clearAsyncError,
  toggleUiSetting,
};

export default connect<any, any, any>(
  mapState,
  mapDispatch
)(AuthForm as any);
