import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch } from 'react-router-dom';
import { Events, Link, scrollSpy } from 'react-scroll';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import HeaderFixed from '@components/header-fixed';

import AccountMenu from '#/@common/account-menu';
import { LinkButton } from '#/@common/link-button';
import { ROUTE } from '#/@store/router';

const defBlocks = {
  start: {
    menu: false,
    name: 'start',
    title: 'Начать',
  },
};

interface IProps {
  blocks?: { [key: string]: { menu?: boolean; name: string; title: string } };
  brandName?: string;
  hideSecond?: boolean;
}

export const HiHeaderTsx: React.FC<IProps> = ({ blocks = defBlocks, hideSecond }) => {
  const { linkButton, muiTabRoot, muiTabsIndicator } = useStyles();

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

  const menuBlocks = useMemo(() => {
    return blocks ? Object.values(blocks).filter(el => el.menu) : [];
  }, [blocks]);

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
  const { formatMessage } = useIntl();

  return (
    <HeaderFixed hideSecond={hideSecond}>
      <Tabs
        classes={{ indicator: muiTabsIndicator }}
        TabIndicatorProps={{ children: <div /> }}
        onChange={handleChange}
        value={value}
        aria-label="link tabs"
      >
        {showTabs &&
          menuBlocks.map(({ name, title }) => (
            <Tab
              classes={{ root: muiTabRoot }}
              value={name}
              key={name}
              component={Link}
              spy
              smooth
              to={name}
              offset={-56}
              label={formatMessage({ id: title })}
              duration={500}
              onSetActive={handleSetActive}
            />
          ))}
        <Tab
          classes={{ root: linkButton }}
          component={LinkButton}
          to={ROUTE.PUBLIC.LIST}
          color="secondary"
          variant="text"
          label="Все проекты"
        />
      </Tabs>
      <Route path="/">
        <Switch>
          <Route path="/auth">
            <span />
          </Route>
          <Route path="/">
            <AccountMenu menuId="hi-header-menu" />
          </Route>
        </Switch>
      </Route>
    </HeaderFixed>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  linkButton: {
    color: theme.palette.secondary.main,
    fontSize: 16,
    opacity: 1,
  },
  muiTabRoot: {
    '&:focus': {
      opacity: 1,
    },
    color: '#fff',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  muiTabsIndicator: {
    '& > div': {
      backgroundColor: theme.palette.secondary.dark,
      maxWidth: 40,
      width: '100%',
    },
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
}));
