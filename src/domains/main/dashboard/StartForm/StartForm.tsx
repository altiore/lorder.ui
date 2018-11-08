import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { StartStopBtn } from 'src/domains/@common/StartStopBtn';
import { ProjectField } from './ProjectField';
import { TaskField } from './TaskField';

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
      <Field name="description" component={TaskField} label="Начни новую задачу..." className={classes.input} />
      <ProjectField
        name="projectId"
        validate={[required({ msg: 'Сначала выберите Проект!' })]}
        className={classes.select}
      />
    </div>
    <StartStopBtn isStarted={isTimerStarted} isLarge onStart={handleSubmit} onStop={stopUserWork} />
  </form>
);
