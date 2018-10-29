import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';
import { ProjectField } from './ProjectField';

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
    <div className={classes.inputBlock}>
      <Field
        autoComplete={'off'}
        name="description"
        component={Input}
        label="Начни новую задачу..."
        wrapperClass={classes.input}
      />
      <ProjectField
        name="projectId"
        validate={[required({ msg: 'Сначала выберете Проект!' })]}
        className={classes.select}
      />
    </div>
    <Tooltip title="Создать и начать задачу">
      <IconButton aria-label="Play" className={classes.button} type="submit">
        <PlayArrowRounded fontSize={'large'} color={'inherit'} />
      </IconButton>
    </Tooltip>
  </form>
);
