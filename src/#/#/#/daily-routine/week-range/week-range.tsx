import React, { useCallback, useMemo } from 'react';

// import cn from 'classnames';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TooltipBig from '@components/tooltip-big';

interface IProps {
  changeCustomRange: (range: [moment.Moment, moment.Moment], uwId?: number) => void;
  lastDay: moment.Moment;
}

export const WeekRangeTsx: React.FC<IProps> = ({ changeCustomRange, lastDay }): JSX.Element => {
  const buttons = useMemo(() => {
    return [
      lastDay.clone().subtract(6, 'day'),
      lastDay.clone().subtract(5, 'day'),
      lastDay.clone().subtract(4, 'day'),
      lastDay.clone().subtract(3, 'day'),
      lastDay.clone().subtract(2, 'day'),
      lastDay.clone().subtract(1, 'day'),
      lastDay.clone(),
    ];
  }, [lastDay]);

  const handleDayClick = useCallback(
    evt => {
      const btnIndex = evt.currentTarget?.dataset?.index;
      if (btnIndex) {
        const clickedBtnDay = buttons[parseInt(btnIndex, 0)];
        const newRange: [moment.Moment, moment.Moment] = [
          clickedBtnDay.clone().startOf('day'),
          clickedBtnDay.clone().endOf('day'),
        ];
        changeCustomRange(newRange);
      }
    },
    [buttons, changeCustomRange]
  );

  const { dayBtn, weekWrap } = useStyles();
  return (
    <div className={weekWrap}>
      {buttons.map((day: moment.Moment, i) => {
        const weekDay = day.locale('ru').format('ddd');
        const isCurWeek = lastDay.isoWeekday() >= day.isoWeekday();
        return (
          <TooltipBig key={weekDay} placement="top" title={day.locale('ru').format('D MMMM')}>
            <Button
              data-index={i}
              onClick={handleDayClick}
              className={dayBtn}
              variant={isCurWeek ? 'contained' : 'outlined'}
              color={isCurWeek ? 'primary' : 'default'}
            >
              {weekDay}
            </Button>
          </TooltipBig>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dayBtn: {
    '&:not(:last-child)': {
      marginRight: 16,
    },
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    flexGrow: 1,
    height: 50,
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
  weekWrap: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 84,
    justifyContent: 'space-between',
    padding: '0 16px',
    width: '100%',
  },
}));
