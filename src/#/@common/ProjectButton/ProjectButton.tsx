import React, { memo, useCallback } from 'react';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import ShortChart from '#/@common/ShortChart';

import { useStyles } from './styles';

import { IProject } from '@types';

export interface IProjectButtonProps {
  inProgress: boolean;
  hidden?: boolean;
  project?: IProject;
  selectProject: (p: IProject) => void;
}

export const ProjectButtonTsx: React.FC<IProjectButtonProps> = memo(
  ({ inProgress, hidden, selectProject, project }) => {
    const handleSelectProject = useCallback(() => {
      if (project) {
        selectProject(project);
      }
    }, [selectProject, project]);

    const { button, inProgressStyle, inProgressStyleGreen, hiddenStyle, text } = useStyles();

    if (!project) {
      return null;
    }

    return (
      <Button
        className={cn(button, { [hiddenStyle]: hidden })}
        component="div"
        onClick={handleSelectProject}
        variant="outlined"
        color="secondary"
      >
        <Typography variant="body1" noWrap className={text}>
          {project.title}
        </Typography>
        <span className={cn(inProgressStyle, { [inProgressStyleGreen]: inProgress })} />
      </Button>
    );
  }
);
