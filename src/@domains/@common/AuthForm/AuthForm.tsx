import React, { useCallback, useMemo, useState } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SwipeableViews from 'react-swipeable-views';

import { LoginForm } from './LoginForm';
import { MagicForm } from './MagicForm';
import { useStyles } from './styles';

export interface ILoginProps {
  autoFocus?: boolean;
  isMagicLoginForm?: boolean;
  toggleUiSetting: any;
}

export const AuthForm: React.FC<ILoginProps> = ({ autoFocus, isMagicLoginForm, toggleUiSetting }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isFullWidth = useMediaQuery(theme.breakpoints.up('sm'));

  const [formTypeIndex, setFormType] = useState(0);
  const isLogin = useMemo(() => formTypeIndex === 0, [formTypeIndex]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setFormType(newValue);
    },
    [setFormType]
  );

  const changeToMagic = useCallback(() => {
    toggleUiSetting('isMagicLoginForm');
  }, [toggleUiSetting]);

  const handleChangeIndex = useCallback(
    (index: number) => {
      if (index < 2) {
        setFormType(index);
      } else {
        toggleUiSetting('isMagicLoginForm');
      }
    },
    [setFormType, toggleUiSetting]
  );

  return (
    <div className={classes.form}>
      <AppBar position="static" className={classes.header}>
        <Tabs value={formTypeIndex} onChange={handleChange} variant="fullWidth">
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        style={{ width: isFullWidth ? 320 : 240 }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={isMagicLoginForm ? 2 : formTypeIndex}
        onChangeIndex={handleChangeIndex}
      >
        <LoginForm isLogin={isLogin} />
        <LoginForm isLogin={isLogin} />
        <MagicForm isLogin={isLogin} />
      </SwipeableViews>
      <Button type="button" className={classes.toggleButton} onClick={changeToMagic} color="secondary">
        {isMagicLoginForm
          ? `${isLogin ? 'Вход' : 'Регистрация'} по паролю`
          : `Прислать ссылку для ${isLogin ? 'входа' : 'регистрации'}`}
      </Button>
    </div>
  );
};
