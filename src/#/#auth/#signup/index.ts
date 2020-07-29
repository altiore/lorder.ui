import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { LOGIN_FORM_NAME, registerWithPassword } from '#/@store/identity';
import { isMagicLoginForm, toggleUiSetting } from '#/@store/ui';

import { SignupTsx } from './signup';

import { IState } from '@types';

interface IMappedProps {
  isMagicLoginForm: boolean;
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isMagicLoginForm,
});

const mapDispatch = {
  push,
  toggleUiSetting,
};

export default connect(
  mapState,
  mapDispatch
)(
  reduxForm<any, any>({
    form: LOGIN_FORM_NAME,
    onSubmit: registerWithPassword,
  })(SignupTsx)
);
