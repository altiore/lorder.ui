import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const NoMatch = ({ match }: RouteComponentProps<{}>) => (
  <div>
    NoMatch
    {match.path}
  </div>
);
