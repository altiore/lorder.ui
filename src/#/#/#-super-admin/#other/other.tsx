import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Page from '@components/page';

export interface IOtherProps extends RouteComponentProps {
  resetGlobalCache: any;
}

export const OtherTsx: React.FC<IOtherProps> = ({ resetGlobalCache }) => {
  return (
    <Page>
      <Button onClick={resetGlobalCache}>Сбросить глобальный кеш проекта (понадобится новый вход)</Button>
    </Page>
  );
};
