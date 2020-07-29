import React, { useCallback } from 'react';

import { InjectedFormProps } from 'redux-form';

import AuthForm from '@components/AuthForm';

interface IProps extends InjectedFormProps<{}, IProps> {
  isMagicLoginForm: boolean;
  push: any;
  toggleUiSetting: any;
}

export const SigninTsx: React.FC<IProps> = React.memo(({ isMagicLoginForm, push, toggleUiSetting, ...props }) => {
  const { autofill, clearAsyncError } = props;
  const toggleWithPassword = useCallback(() => {
    if (!isMagicLoginForm) {
      autofill('password', undefined);
    }
    toggleUiSetting('isMagicLoginForm');
  }, [autofill, isMagicLoginForm, toggleUiSetting]);

  const moveToOtherPage = useCallback(() => {
    clearAsyncError('username');
    clearAsyncError('password');
    push('/auth/signup');
  }, [clearAsyncError, push]);

  return (
    <AuthForm
      isLogin
      isMagicLoginForm={isMagicLoginForm}
      submitBtn="Войти в систему"
      toggleAuthType={moveToOtherPage}
      toggleWithPassword={toggleWithPassword}
      {...props}
    />
  );
});
