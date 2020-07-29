import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import WrongPasswordDialog from '#/#auth/@common/wrong-password.dialog';
import { openDialog } from '#/@store/dialog';
import { LOGIN_FORM_NAME, loginWithPassword } from '#/@store/identity';
import { isMagicLoginForm, toggleUiSetting } from '#/@store/ui';

import { SigninTsx } from './signin';

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

const onSubmitFail = (_, dispatch: any): void => {
  dispatch(openDialog(WrongPasswordDialog));
};

export default reduxForm<any, any>({
  form: LOGIN_FORM_NAME,
  onSubmit: loginWithPassword,
  onSubmitFail,
})(connect(mapState, mapDispatch)(SigninTsx));
