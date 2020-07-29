import React from 'react';

import moment from 'moment';
import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';

import { IEditWorkData } from './@common';
import { useStyles } from './styles';
import TimeDiff from './TimeDiff';
import TimeField from './TimeField';

import { IEvent } from '@types';

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
            <span>Начало задачи</span>
            <Field name="startAt" component={TimeField} format={formatter} parse={parser} />
          </div>
          <div className={classes.col}>
            <span>Конец задачи</span>
            <Field name="finishAt" component={TimeField} format={formatter} parse={parser} />
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
