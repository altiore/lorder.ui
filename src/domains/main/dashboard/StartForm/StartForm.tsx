import { Input } from 'liw-components/Input';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { StartStopBtn } from 'src/domains/@common/StartStopBtn';
import { ProjectField } from './ProjectField';

export interface IInternalProps {
  classes: any;
  isTimerStarted: boolean;
  stopUserWork: () => any;
}

export interface IStartFormProps {
  title?: string;
  buttonText?: string;
}

export const StartFormJsx: React.StatelessComponent<
  IInternalProps & IStartFormProps & InjectedFormProps<{}, IStartFormProps>
> = ({ classes, isTimerStarted, handleSubmit, stopUserWork }) => (
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
        validate={[required({ msg: 'Сначала выберите Проект!' })]}
        className={classes.select}
      />
    </div>
    <StartStopBtn isStarted={isTimerStarted} isLarge onStart={handleSubmit} onStop={stopUserWork} />
  </form>
);
