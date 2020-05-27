import React, { useEffect, useMemo, useState } from 'react';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { secondsToTime } from '#/@store/@common/helpers';

import HourglassSvg from './hourglass';

export interface ITaskDurationProps {
  isOpen?: boolean;
  time: number;
  onClick: any;
  hoursPerDay: number;
}

interface IPartTime {
  value: number;
  unit: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 1,
    width: theme.spacing(6),
  },
  button: {
    '&:hover': {
      '& $buttonInner': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        height: theme.taskCard.outerHeight,
      },
      backgroundColor: 'transparent',
    },
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    height: theme.taskCard.outerHeight,
    justifyContent: 'center',
    padding: 0,
    width: theme.spacing(11),
  },
  buttonInner: {
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    height: theme.taskCard.innerHeight,
    justifyContent: 'space-between',
    minWidth: theme.spacing(3),
    padding: theme.spacing(0, 2 - theme.taskCard.padding, 0, 1 - theme.taskCard.padding),
    transition: theme.transitions.create(['background-color', 'height']),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 0, 0),
    },
  },
  divider: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(1),
  },
  svg: {
    color: '#eecf6d',
  },
  timeStyle: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  unit: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(2.5),
  },
  unitStyle: {
    color: theme.palette.pause.main,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 300,
  },
  valueStyle: {
    color: theme.palette.pause.dark,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
  },
}));
const initPartTimeState = {
  unit: '',
  value: 0,
};

export const TaskDurationTsx: React.FC<ITaskDurationProps> = ({ isOpen, time, onClick, hoursPerDay }) => {
  const { block, button, buttonInner, divider, svg, timeStyle, unit, unitStyle, valueStyle } = useStyles();

  const convertedTime = useMemo(() => secondsToTime(time, hoursPerDay), [hoursPerDay, time]);

  const [firstPartTime, setFirstPartTime] = useState<IPartTime>(initPartTimeState);
  const [secondPartTime, setSecondPartTime] = useState<IPartTime>(initPartTimeState);

  const didNotTouched = useMemo(() => time === 0, [time]);
  const { days, hours, minutes, seconds } = convertedTime;

  useEffect(() => {
    if (days) {
      setFirstPartTime({ value: days, unit: 'дни' });
      setSecondPartTime({ value: hours, unit: 'час' });
    } else if (hours) {
      setFirstPartTime({ value: hours, unit: 'час' });
      setSecondPartTime({ value: minutes, unit: 'мин' });
    } else {
      setFirstPartTime({ value: minutes, unit: 'мин' });
      setSecondPartTime({ value: seconds, unit: 'сек' });
    }
  }, [convertedTime, days, hours, minutes, seconds]);

  return (
    <Tooltip
      placement={'right'}
      title={
        didNotTouched
          ? 'Вы пока не работали над этой задачей'
          : isOpen
          ? 'Закрыть подробности'
          : 'Нажмите, чтоб раскрыть подробности'
      }
    >
      <Button className={button} onClick={didNotTouched ? undefined : onClick}>
        <div className={buttonInner}>
          <HourglassSvg className={svg} />
          <div className={timeStyle}>
            <div className={cn(block, valueStyle)}>
              <span className={unit}>{firstPartTime.value < 10 ? `0${firstPartTime.value}` : firstPartTime.value}</span>
              <span className={divider}>:</span>
              <span className={unit}>
                {secondPartTime.value < 10 ? `0${secondPartTime.value}` : secondPartTime.value}
              </span>
            </div>
            <div className={cn(block, unitStyle)}>
              <span className={unit}>{firstPartTime.unit}</span>
              <span className={divider} />
              <span className={unit}>{secondPartTime.unit}</span>
            </div>
          </div>
        </div>
      </Button>
    </Tooltip>
  );
};
