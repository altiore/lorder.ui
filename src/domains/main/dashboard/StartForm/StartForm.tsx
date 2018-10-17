import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
// import { required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

export interface IInternalProps {
  classes: any;
}

export interface IStartFormProps {
  title?: string;
  buttonText?: string;
}

export const StartFormJsx: React.StatelessComponent<
  IInternalProps & IStartFormProps & InjectedFormProps<{}, IStartFormProps>
> = ({ classes, handleSubmit }) => (
  <form onSubmit={handleSubmit} className={classes.play}>
    <Field name="title" component={Input} label="(нет описания)" />
    <IconButton aria-label="Play" className={classes.button} type="submit">
      <PlayArrowRounded fontSize={'large'} color={'inherit'} />
    </IconButton>
  </form>
);
