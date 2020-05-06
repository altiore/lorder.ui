import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export interface IHeaderFixedProps {
  brandName: string;
  brandLink: string;
  children?: React.ReactElement | false;
}

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create('background-color'),
  },
  appBarOpacity: {
    backgroundColor: 'rgba(37, 36, 38, 0.6)',
  },
  brand: {
    textDecoration: 'none',
  },
  firstToolbar: {
    justifyContent: 'space-between',
  },
  secondToolbar: {
    pointerEvents: 'none',
  },
}));

interface ElevationScrollProps {
  children: React.ReactElement;
  classes: any;
}

function ElevationScroll({ children, classes }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    className: trigger ? classes.appBar : cn(classes.appBar, classes.appBarOpacity),
    elevation: trigger ? 4 : 0,
  });
}

export const HeaderFixedTsx: React.FC<IHeaderFixedProps> = ({ brandName, brandLink, children }) => {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll classes={classes}>
        <AppBar key={'top'} position="fixed">
          <Toolbar className={classes.firstToolbar}>
            <Typography className={classes.brand} variant="h4" color="secondary" component={Link} to={brandLink || '#'}>
              {brandName}
            </Typography>
            {children}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.secondToolbar} />
    </>
  );
};
