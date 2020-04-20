import React, { useCallback, useEffect, useState } from 'react';
import { Events, Link, scrollSpy } from 'react-scroll';

import cn from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export interface IHiHeaderProps {
  brandName: string;
  blocks: { [key: string]: { name: string; title: string } };
}

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create('background-color'),
  },
  appBarOpacity: {
    backgroundColor: 'rgba(37, 36, 38, 0.6)',
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

export const HiHeaderTsx: React.FC<IHiHeaderProps> = ({ blocks, brandName }) => {
  const classes = useStyles();

  const [value, setValue] = useState(blocks.start.name);
  const [isScroll, setIsScroll] = useState(false);

  const theme = useTheme();
  const showTabs = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    Events.scrollEvent.register('begin', function(/*to, element*/) {
      setIsScroll(true);
    });

    Events.scrollEvent.register('end', function(/*to, element*/) {
      setIsScroll(false);
    });

    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, [setIsScroll]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: string) => {
      if (value !== newValue) {
        setValue(newValue);
      }
    },
    [setValue, value]
  );

  const handleSetActive = useCallback(
    (to: string) => {
      if (value !== to && !isScroll) {
        setValue(to);
      }
    },
    [isScroll, value]
  );

  return (
    <>
      <ElevationScroll classes={classes}>
        <AppBar key={'top'} position="fixed">
          <Toolbar className={classes.firstToolbar}>
            <Typography variant="h4" color="secondary">
              {brandName}
            </Typography>
            {showTabs && (
              <Tabs
                TabIndicatorProps={{ children: <div /> }}
                onChange={handleChange}
                value={value}
                aria-label="link tabs"
              >
                {Object.values(blocks).map(({ name, title }) => (
                  <Tab
                    value={name}
                    key={name}
                    component={Link}
                    spy
                    smooth
                    to={name}
                    offset={-56}
                    label={title}
                    duration={500}
                    onSetActive={handleSetActive}
                  />
                ))}
              </Tabs>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.secondToolbar} />
    </>
  );
};
