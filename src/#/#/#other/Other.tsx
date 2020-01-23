import * as React from 'react';

import { RouteComponentProps } from 'react-router';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Page } from '@components/Page';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';

export interface IOtherProps extends RouteComponentProps {
  resetGlobalCache: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'red',
  },
}));

export const OtherTsx: React.FC<IOtherProps> = ({ resetGlobalCache }) => {
  const classes = useStyles();

  return (
    <LayoutLeftDrawer className={classes.root}>
      <Page>
        <Button onClick={resetGlobalCache}>Сбросить глобальный кеш проекта (понадобится новый вход)</Button>
      </Page>
    </LayoutLeftDrawer>
  );
};
