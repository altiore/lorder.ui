import React, { useMemo } from 'react';

import get from 'lodash/get';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import { useStyles } from './styles';

import { IEvent } from '@types';

export interface IHoverInfoProps {
  hoveredEvent: IEvent;
  onOver: any;
  onLeave: any;
}

export const HoverInfoTsx: React.FC<IHoverInfoProps> = ({ hoveredEvent, onOver, onLeave }) => {
  const { popoverPaper, time } = useStyles();

  const hours = useMemo(() => {
    return (hoveredEvent.finishAt || moment()).diff(hoveredEvent.startAt, 'hours');
  }, [hoveredEvent]);

  const minutes = useMemo(() => {
    return (hoveredEvent.finishAt || moment()).diff(hoveredEvent.startAt, 'minutes') % 60;
  }, [hoveredEvent]);

  return (
    <Paper
      className={popoverPaper}
      id={`popover-body-${hoveredEvent.data.id}`}
      onMouseOver={onOver}
      onMouseLeave={onLeave}
    >
      <Typography key="name">{get(hoveredEvent, 'name')}</Typography>
      <div className={time}>
        <Typography variant="h5">{hours}ч.</Typography>
        <Typography variant="h5">{minutes}мин.</Typography>
      </div>
    </Paper>
  );
};
