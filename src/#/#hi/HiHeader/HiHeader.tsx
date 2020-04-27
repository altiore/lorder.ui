import React, { useCallback, useEffect, useState } from 'react';
import { Events, Link, scrollSpy } from 'react-scroll';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import HeaderFixed from '@components/HeaderFixed';

import { secondary } from '../../../@styles/themes/light/palette';

export interface IHiHeaderProps {
  blocks: { [key: string]: { name: string; title: string } };
  brandName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  MuiTabRoot: {
    '&:focus': {
      opacity: 1,
    },
    color: '#fff',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  MuiTabsIndicator: {
    '& > div': {
      backgroundColor: secondary.dark,
      maxWidth: 40,
      width: '100%',
    },
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const HiHeaderTsx: React.FC<IHiHeaderProps> = ({ blocks, brandName }) => {
  const { MuiTabRoot, MuiTabsIndicator } = useStyles();

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
    <HeaderFixed brandName="Altiore" brandLink="/">
      {showTabs && (
        <Tabs
          classes={{ indicator: MuiTabsIndicator }}
          TabIndicatorProps={{ children: <div /> }}
          onChange={handleChange}
          value={value}
          aria-label="link tabs"
        >
          {Object.values(blocks).map(({ name, title }) => (
            <Tab
              classes={{ root: MuiTabRoot }}
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
    </HeaderFixed>
  );
};
