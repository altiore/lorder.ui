import React from 'react';

import cn from 'classnames';
import moment from 'moment';

import ArrowTop from '@components/@icons/arrow-top';
import ClocksIcon from '@components/@icons/clocks';

import { useStyles } from './styles';

const OPENED_HEIGHT = 74;
const CLOSED_HEIGHT = 10;

interface ICurrentTimeIndicatorProps {
  left: number;
  fullSize: boolean | undefined;
}

const CurrentTimeIndicator: React.FC<ICurrentTimeIndicatorProps> = ({ left, fullSize = false }) => {
  const {
    arrowTopIcon,
    arrowTopIconSmall,
    clocksIcon,
    clocksIconSmall,
    currentTimeWrap,
    currentTimeWrapSmall,
    indicatorWrap,
    indicatorWrapSmall,
  } = useStyles();

  return (
    <div
      style={{
        height: !fullSize ? CLOSED_HEIGHT : OPENED_HEIGHT,
        left,
      }}
      className={cn(indicatorWrap, { [indicatorWrapSmall]: !fullSize })}
    >
      <span className={cn(currentTimeWrap, { [currentTimeWrapSmall]: !fullSize })}>{moment().format('HH:mm')}</span>
      <ClocksIcon className={cn(clocksIcon, { [clocksIconSmall]: !fullSize })} />
      <ArrowTop className={cn(arrowTopIcon, { [arrowTopIconSmall]: !fullSize })} />
    </div>
  );
};

export default CurrentTimeIndicator;
