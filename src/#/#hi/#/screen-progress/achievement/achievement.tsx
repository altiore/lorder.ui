import React, { useCallback } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IProps {
  link?: string;
  title: string;
  value: string | number;
}

export const Achievement: React.FC<IProps> = ({ title, value, link }) => {
  const { btnStyle, item, valueStyle } = useStyles();

  const WrapComponent = useCallback(
    ({ children }) => {
      if (link) {
        return (
          <ButtonBase className={btnStyle} href={link} component="a">
            {children}
          </ButtonBase>
        );
      }

      return <div className={btnStyle}>{children}</div>;
    },
    [btnStyle, link]
  );

  return (
    <Grid item className={item}>
      <WrapComponent>
        <div className={valueStyle}>{value}</div>
        <Typography align="center" variant="h4">
          {title}
        </Typography>
      </WrapComponent>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  btnStyle: {
    borderRadius: 8,
    display: 'flex',
    flexFlow: 'column nowrap',
    minWidth: 160,
    width: '100%',
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  valueStyle: {
    ...theme.textGradient[0],
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(86),
    textAlign: 'center',
  },
}));
