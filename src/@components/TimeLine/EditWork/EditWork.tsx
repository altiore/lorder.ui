import React from 'react';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import { Field, InjectedFormProps } from 'redux-form';

import { useStyles } from './styles';
import TimeDiff from './TimeDiff';
import TimeField from './TimeField';

import { IEvent } from '@types';

export interface IEditWorkData {
  finishAt: moment.Moment;
  startAt: moment.Moment;
}
const FORMAT = 'YYYY-MM-DDTHH:mm';

const formatter = (value: moment.Moment) => (value ? value.format(FORMAT) : '');
const parser = (value: string) => (value ? moment(value, FORMAT) : null);

interface IEditWorkProps {
  event: IEvent;
  onClose: any;
}

export const EditWorkTsx: React.FC<InjectedFormProps<IEditWorkData, IEditWorkProps> & IEditWorkProps> = ({
  event,
  handleSubmit,
  onClose,
}) => {
  const classes = useStyles();

  if (!event) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h5" className={classes.title}>
          {event.name}
        </Typography>
        <div className={classes.rowSpaceBetween}>
          <div className={classes.col}>
            <span>Начало</span>
            <Field name="startAt" component={TimeField} format={formatter} parse={parser} />
          </div>
          <div className={cn(classes.col, classes.end)}>
            <span>Конец</span>
            <Field name="finishAt" component={TimeField} format={formatter} parse={parser} />
          </div>
        </div>
        <TimeDiff />
        <div className={classes.grow} />
        <Button color="primary" variant="contained" type="submit">
          Сохранить
        </Button>
      </form>
    </ClickAwayListener>
  );
};
