import * as React from 'react';
import { RouteProps } from 'react-router-dom';

import { LoginForm } from './LoginForm';

// export interface IProps {
//
// }

export const Login = (props: RouteProps) => (
  <div styleName='login'>
    <div styleName='form'>
      <LoginForm
        title="Форма входа"
        buttonText="Войти"
      />
      <div styleName='empty' />
    </div>
  </div>
);
