import Button from '@material-ui/core/Button';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { MagicForm } from './MagicForm';

export interface ILoginProps extends RouteComponentProps<{}> {
  userRole: string;
}

export interface ILoginState {
  isMagic: boolean,
}

export class Login extends React.PureComponent<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
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
          <Button onClick={this.toggleMagic} color={'secondary'}>
            {isMagic ? 'Войти с паролем' : 'Войти при помощи магической ссылки'}
          </Button>
        </div>
      </div>
    );
  }

  private toggleMagic = () => {
    this.setState(({ isMagic }) => ({ isMagic: !isMagic }));
  };
}
