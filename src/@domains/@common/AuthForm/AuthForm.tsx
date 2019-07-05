import Button from '@material-ui/core/Button';
import React, { useCallback, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { LoginForm } from './LoginForm';
import { MagicForm } from './MagicForm';
import { useStyles } from './styles';

export interface ILoginProps {
  autoFocus?: boolean;
  isMagicLoginForm?: boolean;
  toggleUiSetting: any;
}

const FORM_TYPES = ['login', 'signUp', 'magic'];

export const AuthForm: React.FC<ILoginProps> = ({ autoFocus, isMagicLoginForm, toggleUiSetting }) => {
  const classes = useStyles();

  const [formType, setFormType] = useState(FORM_TYPES[0]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: string) => {
      setFormType(newValue);
    },
    [setFormType]
  );

  const changeToMagic = useCallback(() => {
    setFormType(curFormType => (curFormType === FORM_TYPES[2] ? FORM_TYPES[0] : FORM_TYPES[2]));
  }, [setFormType]);

  return (
    <div className={classes.form}>
      <AppBar position="static" className={classes.header}>
        <Tabs value={formType} onChange={handleChange}>
          <Tab label="Вход" value={FORM_TYPES[0]} />
          <Tab label="Регистрация" value={FORM_TYPES[1]} />
        </Tabs>
      </AppBar>
      {isMagicLoginForm ? (
        <MagicForm autoFocus={autoFocus} />
      ) : (
        <LoginForm isLogin={formType === FORM_TYPES[0]} autoFocus={autoFocus} />
      )}
      <Button type="button" className={classes.toggleButton} onClick={changeToMagic} color="secondary">
        {isMagicLoginForm ? 'Вход / Регистрация по паролю' : 'Отправить магическую ссылку'}
      </Button>
    </div>
  );
};
