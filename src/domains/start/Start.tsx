import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LoadingPage } from 'src/domains/@common/LoadingPage';

export interface IStartProps {
  activateUser: () => any;
}

export class Start extends React.Component<RouteComponentProps<{}> & IStartProps, {}> {
  constructor(props: RouteComponentProps<{}> & IStartProps) {
    super(props);
    const { activateUser } = props;
    activateUser();
  }

  public render() {
    return <LoadingPage />;
  }
}
