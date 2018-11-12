import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { StartStopBtn } from 'src/components/StartStopBtn';
import { ProjectField } from './ProjectField';
import { TaskField } from './TaskField';

export interface IInternalProps {
  classes: any;
  selectProject: any;
}

export interface IStartFormData {
  description: string;
  projectId: number;
}

export interface IStartFormProps {
  title?: string;
  buttonText?: string;
}

export const StartFormJsx: React.FunctionComponent<
  IInternalProps & InjectedFormProps<IStartFormData, IStartFormProps>
> = React.memo(({ classes, handleSubmit, initialValues, selectProject }) => (
  <form onSubmit={handleSubmit} className={classes.play}>
    <div className={classes.inputBlock}>
      <Field name="description" component={TaskField} label="Начни новую задачу..." className={classes.input} />
      <Field
        className={classes.select}
        name="projectId"
        component={ProjectField}
        label="Проект"
        onChange={selectProject}
        validate={[required({ msg: 'Сначала выберите Проект!' })]}
      />
    </div>
    <StartStopBtn isStarted={false} isLarge onStart={handleSubmit} />
  </form>
));
