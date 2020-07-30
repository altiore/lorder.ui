import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LorderPoints from '@components/@icons/lorder-points';
import TooltipBig from '@components/TooltipBig';

const useValueStyle = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.dark,
    fontSize: 24,
  },
  value: {
    alignItems: 'center',
    background: 'rgba(230, 215, 186, 0.32)',
    borderRadius: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    minHeight: 26,
    minWidth: 46,
    padding: '0 4px',
  },
  valueText: {
    color: '#757575',
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '1px',
    lineHeight: '13px',
  },
}));

export enum SIZE {
  SMALL,
  LARGE,
}

export interface IValueProps {
  children?: number;
  size?: SIZE;
}

export const ValueTsx: React.FC<IValueProps> = ({ children, size = SIZE.SMALL }): JSX.Element => {
  const { icon, value, valueText } = useValueStyle();
  return (
    <TooltipBig
      title={
        <span>
          Ценность задачи
          <br /> (может изменяться в процессе)
        </span>
      }
      placement="bottom"
    >
      <div className={value}>
        <LorderPoints color="inherit" className={icon} viewBox="0 0 17 14" />
        <Typography component="span" variant={size === SIZE.SMALL ? 'caption' : 'body2'} className={valueText}>
          {children || '--'}
        </Typography>
      </div>
    </TooltipBig>
  );
};
