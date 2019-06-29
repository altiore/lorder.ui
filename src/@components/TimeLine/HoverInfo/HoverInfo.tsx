import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import get from 'lodash/get';
import moment from 'moment';
import React from 'react';

import { IEvent } from '@types';

export interface IHoverInfoProps {
  classes: any;
  hoveredEvent: IEvent;
  onOver: any;
  onLeave: any;
}

export class HoverInfoTsx extends React.Component<IHoverInfoProps, {}> {
  render() {
    const { classes, hoveredEvent, onOver, onLeave } = this.props;

    return (
      <Paper
        className={classes.popoverPaper}
        id={`popover-body-${hoveredEvent.data.id}`}
        onMouseOver={onOver}
        onMouseLeave={onLeave}
      >
        <Typography key="name">{get(hoveredEvent, 'name')}</Typography>
        <Typography key="date">
          {this.getHoursWithMinutes(get(hoveredEvent, 'startAt'))} -{' '}
          {this.getHoursWithMinutes(get(hoveredEvent, 'finishAt'))}
        </Typography>
      </Paper>
    );
  }

  private getHoursWithMinutes = (el?: moment.Moment) => {
    const current = moment();
    if (el) {
      if (el.day() === current.day()) {
        return el.format('HH:mm');
      } else {
        return el.format('DD.MM HH:mm');
      }
    } else {
      return current.format('HH:mm');
    }
  };
}
