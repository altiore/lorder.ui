import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { length } from 'redux-form-validators';

import { TaskField } from './TaskField';

export interface IInternalProps {
  classes: any;
  selectedProject: any;
  theme: Theme;
}

export interface IStartFormData {
  description: string;
  projectId: number;
}

export class IStartFormProps {
  title?: string;
  buttonText?: string;
}

export const StartFormJsx: React.FunctionComponent<
  IInternalProps & InjectedFormProps<IStartFormData, IStartFormProps>
> = React.memo(({ classes, handleSubmit, selectedProject }) => (
  <form onSubmit={handleSubmit} className={classes.play}>
    <div className={classes.inputBlock}>
      <Field
        name="description"
        component={TaskField}
        label="Выбери или создай задачу..."
        className={classes.input}
        validate={[length({ max: 40, msg: 'Превышен максимум 40 символов' })]}
      />
    </div>
    <Tooltip
      title={selectedProject ? `Создать новую задачу в проекте "${selectedProject.title}"` : ''}
      placement={'top'}
    >
      <Fab onClick={handleSubmit} className={classes.stop}>
        <AddIcon fontSize={'default'} />
      </Fab>
    </Tooltip>
  </form>
));
