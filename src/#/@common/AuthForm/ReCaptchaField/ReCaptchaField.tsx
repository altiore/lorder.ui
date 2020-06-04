import React, { useMemo } from 'react';
import { useReCaptcha } from 'react-use-recaptcha-v3';

import { WrappedFieldProps } from 'redux-form';

interface IReCaptchaField extends WrappedFieldProps {
  isLogin: boolean;
  isMagic: boolean;
}

export const ReCaptchaField: React.FC<IReCaptchaField> = ({ input: { onChange }, isLogin, isMagic }) => {
  const actionName = useMemo(() => {
    return (isMagic ? 'magic_' : 'password') + (isLogin ? 'login' : 'registration');
  }, [isLogin, isMagic]);

  useReCaptcha(
    process.env.REACT_APP_GOOGLE_reCAPTCHA_TOKEN as string,
    actionName,
    onChange,
    Boolean(process.env.REACT_APP_GOOGLE_reCAPTCHA_TOKEN)
  );

  return null;
};
