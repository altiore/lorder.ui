import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LorderIco from '@components/@icons/lorder';
import TooltipBig from '@components/TooltipBig';

const useValueStyle = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.dark,
    fontSize: 14,
    marginTop: -3,
  },
  value: {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    minHeight: 20,
    minWidth: 20,
    padding: '0 4px',
  },
  valueText: {
    color: theme.palette.default.main,
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
        <Typography component="span" variant={size === SIZE.SMALL ? 'caption' : 'body2'} className={valueText}>
          {children || '--'}
        </Typography>
        <LorderIco color="inherit" className={icon} />
      </div>
    </TooltipBig>
  );
};
