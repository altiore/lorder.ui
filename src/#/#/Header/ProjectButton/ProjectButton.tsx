import React, { memo, useCallback, useState } from 'react';
import Popover from 'react-popover';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { Project } from '#/@store/projects';

import ShortChart from './ShortChart';
import { useStyles } from './styles';

export interface IProjectButtonProps {
  inProgress: boolean;
  onOpenInNew: any;
  selectProject: any;

  selectedProject: Project;
}

export const ProjectButtonTsx: React.FC<IProjectButtonProps> = memo(
  ({ inProgress, onOpenInNew, selectProject, selectedProject }) => {
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    const onClosePopover = useCallback(() => setIsOpen(false), [setIsOpen]);

    const onMouseEnterHandler = useCallback(() => setIsOpen(true), [setIsOpen]);

    return (
      <Popover
        className={classes.projectPopover}
        tipSize={4}
        place="below"
        isOpen={isOpen}
        onOuterAction={onClosePopover}
        body={<ShortChart />}
      >
        <Button
          className={classes.button}
          component="div"
          onClick={selectProject(selectedProject)}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onClosePopover}
          onMouseOver={onMouseEnterHandler}
          variant={'outlined'}
          color={'secondary'}
        >
          <Typography variant="body1" noWrap className={classes.text}>
            {selectedProject.title}
          </Typography>
          <IconButton
            color="secondary"
            onClick={onOpenInNew(selectedProject)}
            className={classes.openInNew}
            style={{ visibility: isOpen ? 'visible' : 'hidden' }}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
          <span className={cn(classes.inProgress, { [classes.inProgressGreen]: inProgress })} />
        </Button>
      </Popover>
    );
  }
);
