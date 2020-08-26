import React, { useMemo } from 'react';

import { Field, InjectedFormProps } from 'redux-form';
import { email, length, required } from 'redux-form-validators';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserIco from '@material-ui/icons/AlternateEmail';

import PassIco from '@components/@icons/password';
import InputField from '@components/input-field';

// import ReCaptchaField from './ReCaptchaField';

export const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: '#ffffff',
    opacity: 0.2,
    width: 125,
  },
  dividerText: {
    color: '#ffffff',
    height: 24,
    lineHeight: '24px',
    textAlign: 'center',
    width: 60,
  },
  dividerWrap: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  fieldWrap: {
    color: '#ffffff',
    height: 72,
    paddingBottom: theme.spacing(1.5),
  },
  form: {
    paddingBottom: theme.spacing(1.5),
    width: '100%',
  },
  formWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  moveToRouteStyle: {
    marginTop: 12,
  },
  submitStyle: {
    marginTop: 12,
  },
  withoutPassword: {
    marginTop: 24,
  },
  wrapper: {
    maxWidth: 310,
  },
}));

export interface ILoginFormProps {
  autoFocus?: boolean;
  buttonText?: string;
  isLogin: boolean;
  isMagicLoginForm: boolean;
  noPasswordText?: string;
  submitBtn?: string;
  toggleAuthType: any;
  toggleWithPassword: any;
}

const emailValidator = email({ msg: 'Введите валидный email-адрес' });
const passwordValidator = [required({ msg: 'Пароль обязателен' }), length({ min: 8 })];

export const AuthForm: React.FC<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>> = React.memo(
  ({
    autoFocus,
    handleSubmit,
    invalid,
    isLogin,
    isMagicLoginForm,
    noPasswordText = 'Я хочу войти',
    pristine,
    submitting,
    submitBtn,
    toggleAuthType,
    toggleWithPassword,
  }) => {
    const secondText = useMemo(() => {
      if (isMagicLoginForm) {
        return ' с паролем';
      } else {
        return ' без пароля';
      }
    }, [isMagicLoginForm]);

    const btnText = useMemo(() => {
      if (isLogin) {
        return 'Зарегистрироваться';
      } else {
        return 'Войти в систему';
      }
    }, [isLogin]);

    const {
      divider,
      dividerText,
      dividerWrap,
      fieldWrap,
      form,
      formWrapper,
      moveToRouteStyle,
      submitStyle,
      withoutPassword,
      wrapper,
    } = useStyles();
    return (
      <div className={wrapper}>
        <div className={formWrapper}>
          <form className={form} onSubmit={handleSubmit}>
            {/*<Field name="reCaptcha" component={ReCaptchaField} />*/}
            <div className={fieldWrap}>
              <Typography component="label" htmlFor="username">
                Email
              </Typography>
              <Field
                id="username"
                autoComplete="username"
                fullWidth
                autoFocus={autoFocus}
                component={InputField}
                icon={<UserIco />}
                name="email"
                placeholder="Введите email..."
                type="email"
                validate={emailValidator}
              />
            </div>
            <Collapse in={!isMagicLoginForm}>
              <div className={fieldWrap}>
                {!isMagicLoginForm && (
                  <>
                    <Typography component="label" htmlFor="username">
                      Пароль
                    </Typography>
                    <Field
                      id="password"
                      fullWidth
                      autoComplete="current-password"
                      component={InputField}
                      icon={<PassIco />}
                      name="password"
                      placeholder="Введите пароль..."
                      type="password"
                      validate={passwordValidator}
                    />
                  </>
                )}
              </div>
            </Collapse>
            <Button
              color="secondary"
              className={submitStyle}
              disabled={submitting || (!pristine && invalid)}
              fullWidth
              type="submit"
              variant="contained"
            >
              <span>{submitBtn || 'Войти'}</span>
            </Button>
            <Button fullWidth variant="contained" className={withoutPassword} onClick={toggleWithPassword}>
              {noPasswordText}
              {secondText}
            </Button>
          </form>
        </div>

        <div className={dividerWrap}>
          <div>
            <Divider className={divider} />
          </div>
          <div className={dividerText}>или</div>
          <div>
            <Divider className={divider} />
          </div>
        </div>

        <Button fullWidth variant="outlined" color="secondary" className={moveToRouteStyle} onClick={toggleAuthType}>
          {btnText}
        </Button>
      </div>
    );
  }
);
