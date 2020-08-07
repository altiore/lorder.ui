import React from 'react';

import moment from 'moment';
import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';

import { IEditWorkData } from './@common';
import { useStyles } from './styles';
import TimeDiff from './time-diff';
import CustomDatepickerInput from './time-field';

import { IEvent } from '@types';

const formatter = (value: moment.Moment) => {
  if (value) {
    return value.toDate();
  }
  return '';
};

const normalize = (value: string): moment.Moment => moment(value);

interface IEditWorkProps {
  event: IEvent;
  onClose: any;
}

export const EditWorkTsx: React.FC<InjectedFormProps<IEditWorkData, IEditWorkProps> & IEditWorkProps> = ({
  event,
  handleSubmit,
  onClose,
  pristine,
  submitting,
}) => {
  const classes = useStyles();
  if (!event) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <p className={classes.noMarginBottom}>Задача:</p>
        <h2 className={classes.noMargin}>{event.name}</h2>
        <p className={classes.noMarginBottom}>Затрачено:</p>
        <div className={classes.workedHoursToday}>
          <TimeDiff />
        </div>
        <div className={classes.rowSpaceBetween}>
          <div className={classes.col}>
            <span className={classes.fieldTitle}>Начало задачи</span>
            <Field name="startAt" component={CustomDatepickerInput} format={formatter} normalize={normalize} />
          </div>
          <div className={classes.col}>
            <span className={classes.fieldTitle}>Конец задачи</span>
            <Field name="finishAt" component={CustomDatepickerInput} format={formatter} normalize={normalize} />
          </div>
        </div>

        <div className={classes.grow} />
        <Button color="primary" variant="contained" type="submit" disabled={pristine || submitting}>
          Сохранить
        </Button>
      </form>
    </ClickAwayListener>
  );
};
