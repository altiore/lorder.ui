import React, { useCallback, useEffect, useMemo, useState } from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { Button, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import T from '@material-ui/core/Typography';

import ActivityTimeline from '#/#/#/@common/activity-time-line';
import { IRangeFilter, RANGE_FROM_RANGE_FILTER } from '#/@store/ui';

export const useStyles = makeStyles((theme: Theme) => ({
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
  severalDays: {
    height: 84,
    padding: '0 16px',
  },
  topContent: {
    padding: '0 16px',
  },
  workedHoursStyle: {
    textAlign: 'center',
  },
}));

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

interface IProps {
  changeRangeFilter: (f: IRangeFilter) => void;
  curRangeFilter: IRangeFilter;
  getRangeDuration: (start: moment.Moment, finish?: moment.Moment) => Promise<string>;
  open: boolean;
  onClose: () => void;
}

const DATE_FORMAT = 'YYYY-MM-DD';

export const DailyRoutineMain: React.FC<IProps> = ({
  changeRangeFilter,
  curRangeFilter,
  getRangeDuration,
  onClose,
  open,
}): JSX.Element => {
  const curBtn = useMemo(() => {
    return BUTTONS.find(el => el.id === curRangeFilter);
  }, [curRangeFilter]);

  const curRange = useMemo(() => curBtn && RANGE_FROM_RANGE_FILTER[curBtn.id], [curBtn]);

  const curDateText = useMemo(() => {
    if (curRange) {
      const start = curRange[0].format(DATE_FORMAT);
      const end = curRange[1].format(DATE_FORMAT);
      if (start === end) {
        return curRange[0].locale('ru').format('D MMMM YYYYг');
      }

      return curRange[0].locale('ru').format('D MMMM') + ` - ${curRange[1].locale('ru').format('D MMMM YYYYг')}`;
    }

    return moment()
      .locale('ru')
      .format('D MMMM YYYYг');
  }, [curRange]);

  const [spendInCurRange, setSpendInCurRange] = useState('0c');

  useEffect(() => {
    (async function() {
      if (curRange) {
        setSpendInCurRange(await getRangeDuration(...curRange));
      }
    })();
  }, [curRange, getRangeDuration]);

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
    severalDays,
    topContent,
    workedHoursStyle,
  } = useStyles();
  return (
    <Dialog open={open} className={dialogStyle} fullScreen TransitionComponent={Transition} onClose={handleClose}>
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
        {[IRangeFilter.TODAY, IRangeFilter.YESTERDAY].includes(curRangeFilter) ? (
          <ActivityTimeline fullSize currentTimeCustom={spendInCurRange} />
        ) : (
          <div className={severalDays}>другой элемент</div>
        )}
      </div>
    </Dialog>
  );
};
