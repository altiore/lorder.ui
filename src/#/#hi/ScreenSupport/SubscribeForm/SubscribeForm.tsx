import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { UserIco } from '@components/@icons/User';
import InputField from '@components/InputField';

import { Field, InjectedFormProps } from 'redux-form';
import { email } from 'redux-form-validators';

import GetInTouchImg from './get_in_touch.png';

interface ISubscribeForm extends InjectedFormProps<any> {
  name?: string;
}

const IMG_SIZE = {
  height: 509,
  width: 500,
};

const useStyles = makeStyles((theme: Theme) => ({
  fields: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      maxWidth: theme.spacing(37),
      minWidth: theme.spacing(37),
    },
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    flexGrow: 1,
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
    },
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexFlow: 'column-reverse',
    },
  },
  svgWrapper: {
    '& > img': {
      height: IMG_SIZE.height / 2,
      margin: theme.spacing(0, -4, -3, 0),
      width: IMG_SIZE.width / 2,
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(0, 0, -3, 0),
      },
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
}));

export const SubscribeForm: React.FC<ISubscribeForm> = ({ handleSubmit }) => {
  const { fields, form, root, svgWrapper, title } = useStyles();

  return (
    <Paper className={root}>
      <form className={form} onSubmit={handleSubmit}>
        <Typography variant="h4" className={title}>
          Хочу получать обновления о проекте
        </Typography>
        <div className={fields}>
          <Field
            autoComplete="username"
            component={InputField}
            icon={<UserIco />}
            name="email"
            placeholder="Введите email..."
            type="email"
            validate={[email({ msg: 'Введите валидный email-адрес' })]}
          />
          <Button fullWidth type="submit" color="secondary" variant="outlined">
            Подписаться на обновления
          </Button>
        </div>
      </form>
      <div className={svgWrapper}>
        <img src={GetInTouchImg} alt="Subscribe" />
      </div>
    </Paper>
  );
};
