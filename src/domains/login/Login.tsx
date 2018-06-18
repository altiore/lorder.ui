import * as React from 'react';
import { RouteProps } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { MagicForm } from './MagicForm';

// export interface IProps {
//
// }

export interface ILoginState {
  isMagic: boolean,
}

export class Login extends React.Component<RouteProps, ILoginState> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      isMagic: false,
    };
  }

  public render() {
    const { isMagic } = this.state;
    return (
      <div styleName='login'>
        <div styleName='form'>
          {isMagic ? (
            <MagicForm
              title='Отправить магическую ссылку'
              buttonText='Отправить'
            />
          ) : (
            <LoginForm
              title='Форма входа'
              buttonText='Войти'
            />
          )}
          <a href='#' onClick={this.toggleMagic}>
            {isMagic ? 'Войти с паролем' : 'Войти при помощи магической ссылки'}
          </a>
        </div>
      </div>
    );
  }

  private toggleMagic = () => {
    this.setState(({ isMagic }) => ({ isMagic: !isMagic }));
  };
}
