import React, { useCallback } from 'react';

import { InjectedFormProps } from 'redux-form';

import AuthForm from '@components/auth-form';

interface IProps extends InjectedFormProps<{}, IProps> {
  clearErrors: any;
  isMagicLoginForm: boolean;
  push: any;
  toggleUiSetting: any;
}

export const SignupTsx: React.FC<IProps> = ({ isMagicLoginForm, push, toggleUiSetting, ...props }) => {
  const { clearAsyncError } = props;
  const toggleWithPassword = useCallback(() => {
    toggleUiSetting('isMagicLoginForm');
  }, [toggleUiSetting]);

  const moveToOtherPage = useCallback(() => {
    clearAsyncError('username');
    clearAsyncError('password');
    push('/auth/signin');
  }, [clearAsyncError, push]);

  return (
    <AuthForm
      isLogin={false}
      isMagicLoginForm={isMagicLoginForm}
      noPasswordText="Я хочу зарегистрироваться"
      submitBtn="Зарегистрироваться"
      toggleAuthType={moveToOtherPage}
      toggleWithPassword={toggleWithPassword}
      {...props}
    />
  );
};
