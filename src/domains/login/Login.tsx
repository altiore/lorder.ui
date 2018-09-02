import Button from '@material-ui/core/Button';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { MagicForm } from './MagicForm';

export interface ILoginProps extends RouteComponentProps<{}> {
  isMagicLoginForm: boolean;
  toggleUiSetting: (setting: 'isMagicLoginForm') => void;
  userRole: string;
}

export class Login extends React.PureComponent<ILoginProps, {}> {
  public render() {
    const { isMagicLoginForm } = this.props;
    return (
      <div styleName="login">
        <div styleName="form">
          {isMagicLoginForm ? <MagicForm buttonText="Отправить магическую ссылку" /> : <LoginForm buttonText="Войти" />}
          <Button onClick={this.toggleMagic} color={'secondary'}>
            {isMagicLoginForm ? 'Войти при помощи пароля' : 'Войти при помощи магической ссылки'}
          </Button>
        </div>
      </div>
    );
  }

  private toggleMagic = () => this.props.toggleUiSetting('isMagicLoginForm');
}
