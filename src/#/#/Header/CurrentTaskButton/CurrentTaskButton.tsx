import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { LinkButton } from '#/@common/LinkButton';
import { TASKS_ROUTE } from '#/@store/router';

import { ITask } from '@types';

interface ICurrentTaskBtn {
  currentTask?: ITask;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export const CurrentTaskBtn: React.FC<ICurrentTaskBtn> = ({ currentTask }) => {
  const { button } = useStyles();

  if (!currentTask) {
    return null;
  }

  return (
    <Tooltip title={`Текущая задача: ${currentTask.title}`}>
      <div>
        <LinkButton
          to={`${TASKS_ROUTE(currentTask.projectId)}/${currentTask.sequenceNumber}`}
          className={button}
          color="secondary"
          variant="outlined"
        >
          #{currentTask.sequenceNumber}
        </LinkButton>
      </div>
    </Tooltip>
  );
};
