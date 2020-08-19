import React from 'react';

import cn from 'classnames';

import { makeStyles, Theme } from '@material-ui/core/styles';
import ArrowTop from '@material-ui/icons/ArrowDropUp';

import ClocksIcon from '@components/@icons/clocks';

const OPENED_HEIGHT = 80;
const CLOSED_HEIGHT = 16;

interface IProps {
  children: string;
  left: number;
  fullSize: boolean | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  arrowTopIcon: {
    bottom: -16,
    fill: theme.palette.primary.main,
    fontSize: 30,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-51%)',
  },
  clocksIcon: {
    fill: theme.palette.primary.main,
    left: '50%',
    position: 'absolute',
    top: -24,
    transform: 'translateX(-51%)',
  },
  clocksIconSmall: {
    fontSize: 14,
    top: -14,
  },
  currentTimeWrap: {
    background: theme.palette.primary.main,
    borderRadius: 5,
    bottom: -23,
    color: '#fff',
    left: '50%',
    minWidth: 51,
    padding: '0 3px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  },
  indicatorWrap: {
    background: theme.palette.primary.main,
    height: OPENED_HEIGHT,
    position: 'absolute',
    top: -4,
    width: 1,
    zIndex: 1300,
  },
  indicatorWrapSmall: {
    height: CLOSED_HEIGHT,
  },
}));

export const CurrentTimeIndicator: React.FC<IProps> = ({ left, fullSize = false, children }): JSX.Element => {
  const { arrowTopIcon, clocksIcon, clocksIconSmall, currentTimeWrap, indicatorWrap, indicatorWrapSmall } = useStyles();

  return (
    <div
      style={{ left: fullSize ? left + 17 : left }}
      className={cn(indicatorWrap, { [indicatorWrapSmall]: !fullSize })}
    >
      <ClocksIcon className={cn(clocksIcon, { [clocksIconSmall]: !fullSize })} />
      <ArrowTop className={arrowTopIcon} />
      <span className={currentTimeWrap}>{children}</span>
    </div>
  );
};
