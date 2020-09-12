import React, { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

import useResizeTheme from '@hooks/use-resize-theme';

export interface IPageProps {
  className?: string;
  children?: any;
}

export const PageJsx: React.FunctionComponent<IPageProps> = ({ className, children }) => {
  const { height: pHeight, isWidthSm } = useResizeTheme();

  const height = useMemo(() => {
    return pHeight - 69.6 - (isWidthSm ? 0 : 112);
  }, [pHeight, isWidthSm]);

  const { paper, root } = useStyles();
  return (
    <Grid container className={cn(root, className)}>
      <Grid item xs={12}>
        <Paper className={paper}>
          <Scrollbars autoHide autoHeightMin={0} autoHeightMax={height} style={{ height }}>
            {children}
          </Scrollbars>
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));
