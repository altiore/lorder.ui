import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import LorderLogoWithText from '@components/@icons/lorder-logo-with-text';

export interface IHeaderFixedProps {
  children?: React.ReactNode | false;
}

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create('background-color'),
  },
  appBarOpacity: {
    backgroundColor: 'rgba(37, 36, 38, 0.6)',
  },
  brand: {
    height: 45,
    marginTop: 6,
    width: 99,
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

export const HeaderFixedTsx: React.FC<IHeaderFixedProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll classes={classes}>
        <AppBar key={'top'} position="fixed" color="default">
          <Toolbar className={classes.firstToolbar}>
            <Link to="/">
              <LorderLogoWithText className={classes.brand} />
            </Link>
            {/*<Typography className={classes.brand} variant="h4" color="secondary" component={Link} to="/">*/}
            {/*  {brandName}*/}
            {/*</Typography>*/}
            {children}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.secondToolbar} />
    </>
  );
};
