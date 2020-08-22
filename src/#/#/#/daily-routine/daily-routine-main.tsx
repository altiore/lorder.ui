import React, { useCallback, useEffect, useMemo, useState } from 'react';

import moment from 'moment';

import { Button, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import T from '@material-ui/core/Typography';

import ActivityTimeline from '#/#/#/@common/activity-time-line';
import { IRangeFilter } from '#/@store/ui';

import CustomWeek from './custom-week';
import MonthRange from './month-range';
import WeekRange from './week-range';

const Transition = React.forwardRef(function TransitionInner(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BUTTONS = [
  {
    id: IRangeFilter.LAST_MONTH,
    text: 'текущий месяц',
    title: 'Месяц',
  },
  {
    id: IRangeFilter.LAST_WEEK,
    text: 'текущую неделю',
    title: 'Неделю',
  },
  {
    id: IRangeFilter.YESTERDAY,
    text: 'вчера',
    title: 'Вчера',
  },
  {
    id: IRangeFilter.TODAY,
    text: 'сегодня',
    title: 'Сегодня',
  },
];

const DATE_FORMAT = 'YYYY-MM-DD';

interface IProps {
  changeRangeFilter: (f: IRangeFilter) => void;
  curRangeFilter: IRangeFilter;
  currentRange: [moment.Moment, moment.Moment];
  getRangeDuration: (start: moment.Moment, finish?: moment.Moment) => Promise<string>;
  open: boolean;
  onClose: () => void;
}

export const DailyRoutineMain: React.FC<IProps> = ({
  changeRangeFilter,
  curRangeFilter,
  currentRange,
  getRangeDuration,
  onClose,
  open,
}): JSX.Element => {
  const curBtn = useMemo(() => {
    return BUTTONS.find(el => el.id === curRangeFilter);
  }, [curRangeFilter]);

  const curDateText = useMemo(() => {
    if (currentRange && currentRange[0] && currentRange[1]) {
      const start = currentRange[0].format(DATE_FORMAT);
      const end = currentRange[1].format(DATE_FORMAT);
      if (start === end) {
        return currentRange[0].locale('ru').format('D MMMM YYYYг');
      }

      return (
        currentRange[0].locale('ru').format('D MMMM') + ` - ${currentRange[1].locale('ru').format('D MMMM YYYYг')}`
      );
    }

    return moment()
      .locale('ru')
      .format('D MMMM YYYYг');
  }, [currentRange]);

  const [spendInCurRange, setSpendInCurRange] = useState('0c');

  useEffect(() => {
    (async function() {
      if (currentRange) {
        setSpendInCurRange(await getRangeDuration(...currentRange));
      }
    })();
  }, [currentRange, getRangeDuration]);

  const handleClose = useCallback(() => {
    onClose();
    changeRangeFilter(IRangeFilter.TODAY);
  }, [changeRangeFilter, onClose]);

  useEffect(() => {
    return () => {
      changeRangeFilter(IRangeFilter.TODAY);
    };
  }, [changeRangeFilter]);

  const handleChangeFilter = useCallback(
    evt => {
      const id = parseInt(evt?.currentTarget?.dataset?.id, 0);
      changeRangeFilter(id);
    },
    [changeRangeFilter]
  );

  const {
    button,
    buttonsBlock,
    currentDate,
    dialogContentWrap,
    dialogStyle,
    dividerStyle,
    infoBlock,
    rootDialog,
    topContent,
    workedHoursStyle,
  } = useStyles();
  return (
    <Dialog
      open={open}
      className={dialogStyle}
      classes={{
        container: rootDialog,
      }}
      fullScreen
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <div className={dialogContentWrap}>
        <div className={topContent}>
          <T variant="h3" className={currentDate}>
            {curDateText}
          </T>
          <Grid container>
            <Grid item lg={4} md={2} sm={6} container justify="flex-start" alignItems="center">
              <T variant="h4" className={infoBlock}>
                Времени затрачено за {curBtn?.text}:
              </T>
            </Grid>
            <Grid item lg={4} md={2} sm={6} container justify="center" alignItems="center">
              <T variant="h3" className={workedHoursStyle} color="primary">
                {spendInCurRange}
              </T>
            </Grid>
            <Grid item lg={4} md={8} sm={12} container justify="flex-end" alignItems="center">
              <div className={buttonsBlock}>
                {BUTTONS.map(({ id, title }) => (
                  <Button
                    key={id}
                    className={button}
                    color={id === curRangeFilter ? 'primary' : 'default'}
                    variant={id === curRangeFilter ? 'contained' : 'outlined'}
                    onClick={handleChangeFilter}
                    data-id={id}
                  >
                    {title}
                  </Button>
                ))}
              </div>
            </Grid>
          </Grid>
          <Divider className={dividerStyle} />
        </div>
        {[IRangeFilter.TODAY, IRangeFilter.YESTERDAY, IRangeFilter.CUSTOM_DAY].includes(curRangeFilter) ? (
          <ActivityTimeline fullSize currentTimeCustom={spendInCurRange} />
        ) : (
          {
            [IRangeFilter.LAST_WEEK]: <WeekRange lastDay={moment()} />,
            [IRangeFilter.CUSTOM_WEEK]: <CustomWeek />,
            [IRangeFilter.LAST_MONTH]: <MonthRange lastDay={moment()} />,
          }[curRangeFilter]
        )}
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&:not(:first-child)': {
      marginLeft: 4,
    },
    '&:not(:last-child)': {
      marginRight: 4,
    },
    width: 100,
  },
  buttonsBlock: {
    minWidth: 424,
  },
  currentDate: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: 300,
    margin: '16px 0',
    textAlign: 'center',
  },
  dialogContentWrap: {
    overflow: 'hidden',
    padding: '0 32px 32px',
    [theme.breakpoints.down('md')]: {
      padding: '0 50px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  dialogStyle: {
    height: 'fit-content',
  },
  dividerStyle: {
    margin: '16px 0 32px',
  },
  infoBlock: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
  },
  rootDialog: {
    height: 'auto',
  },
  topContent: {
    padding: '0 16px',
  },
  workedHoursStyle: {
    textAlign: 'center',
  },
}));
