import React, { useCallback, useMemo } from 'react';

import moment from 'moment';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TooltipBig from '@components/tooltip-big';

interface IProps {
  changeCustomWeek: (range: [moment.Moment, moment.Moment]) => void;
  lastDay: moment.Moment;
}

export const MonthRangeTsx: React.FC<IProps> = ({ changeCustomWeek, lastDay }): JSX.Element => {
  const buttons = useMemo(() => {
    const startMonth = lastDay.clone().startOf('month');
    let endWeek = lastDay.clone().endOf('isoWeek');
    const res: any = [];
    while (startMonth.unix() < endWeek.unix()) {
      if (endWeek.unix() > lastDay.unix()) {
        endWeek = lastDay.clone().endOf('day');
      }
      res.unshift([endWeek.clone().startOf('isoWeek'), endWeek]);
      endWeek = endWeek
        .clone()
        .subtract(7, 'day')
        .endOf('isoWeek');
    }
    return res;
  }, [lastDay]);

  const handleDayClick = useCallback(
    evt => {
      const btnIndex = evt.currentTarget?.dataset?.index;
      if (btnIndex) {
        const clickedBtnDays = buttons[parseInt(btnIndex, 0)];
        const newRange: [moment.Moment, moment.Moment] = [
          clickedBtnDays[0].clone().startOf('day'),
          clickedBtnDays[1].clone().endOf('day'),
        ];
        changeCustomWeek(newRange);
      }
    },
    [buttons, changeCustomWeek]
  );

  const { dayBtn, weekWrap } = useStyles();
  return (
    <div className={weekWrap}>
      {buttons.map(([begin, end]: [moment.Moment, moment.Moment], i) => {
        return (
          <TooltipBig key={i} placement="top" title={`Показать задачи недели`}>
            <Button data-index={i} onClick={handleDayClick} className={dayBtn} variant={'contained'} color={'primary'}>
              {begin.locale('ru').format('D MMMM')} - {end.locale('ru').format('D MMMM')}
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
