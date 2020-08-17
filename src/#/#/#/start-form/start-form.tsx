import React, { useState } from 'react';

import { InjectedFormProps } from 'redux-form';

import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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

export const StartFormJsx: React.FunctionComponent<IInternalProps &
  InjectedFormProps<IStartFormData, IStartFormProps>> = React.memo(({ classes, handleSubmit, selectedProject }) => {
  const [hovered, setHovered] = useState(false);

  const onHover = () => setHovered(true);
  const onOut = () => setHovered(false);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Tooltip
        title={`Создать новую задачу${selectedProject ? ` в проекте "${selectedProject.title}"` : ''}`}
        placement="top"
      >
        <Fab onClick={handleSubmit} className={classes.add} onMouseOver={onHover} onMouseLeave={onOut} size="large">
          {hovered ? `Создать новую задачу` : <AddIcon />}
        </Fab>
      </Tooltip>
    </form>
  );
});
