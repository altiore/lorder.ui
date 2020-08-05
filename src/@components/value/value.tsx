import React, { useCallback } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LorderPoints from '@components/@icons/lorder-points';
import TooltipBig from '@components/tooltip-big';

const useValueStyle = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.dark,
    fontSize: 16,
    height: 16,
    marginRight: 3,
    width: 16,
  },
  value: {
    alignItems: 'center',
    background: '#F6F2E9',
    borderRadius: 10,
    display: 'flex',
    height: 26,
    justifyContent: 'center',
    padding: '0 8px 0 4px',
  },
  valueText: {
    color: '#757575',
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
}));

export enum SIZE {
  SMALL,
  LARGE,
}

export interface IValueProps {
  children?: number;
  disableTooltip?: boolean;
  size?: SIZE;
}

export const ValueTsx: React.FC<IValueProps> = ({ children, size = SIZE.SMALL, disableTooltip }): JSX.Element => {
  const { icon, value, valueText } = useValueStyle();
  const renderValue = useCallback(
    () => (
      <div className={value}>
        <LorderPoints color="inherit" className={icon} viewBox="0 0 17 14" />
        <Typography component="span" variant={size === SIZE.SMALL ? 'caption' : 'body2'} className={valueText}>
          {children || '--'}
        </Typography>
      </div>
    ),
    [children, icon, size, value, valueText]
  );

  if (disableTooltip) {
    return renderValue();
  }

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
      {renderValue()}
    </TooltipBig>
  );
};
