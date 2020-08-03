import React from 'react';

import moment from 'moment';

import ArrowTop from '@components/@icons/arrow-top';
import ClocksIcon from '@components/@icons/clocks';

import { useStyles } from './styles';

const OPENED_HEIGHT = 74;
const CLOSED_HEIGHT = 17;

interface ICurrentTimeIndicatorProps {
  left: number;
  fullSize: boolean | undefined;
}

const CurrentTimeIndicator: React.FC<ICurrentTimeIndicatorProps> = ({ left, fullSize = false }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        height: !fullSize ? CLOSED_HEIGHT : OPENED_HEIGHT,
        left,
      }}
      className={classes.indicatorWrap}
    >
      <span className={classes.currentTimeWrap}>{moment().format('HH:mm')}</span>
      <ClocksIcon className={classes.clocksIcon} />
      <ArrowTop className={classes.ArrowTopIcon} />
    </div>
  );
};

export default CurrentTimeIndicator;
