import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LoadingPage } from 'src/components/LoadingPage';

export interface IStartProps {
  activateUser: () => any;
  userIsLoading: boolean;
}

export class Start extends React.Component<RouteComponentProps<{}> & IStartProps, {}> {
  public async componentDidMount() {
    if (!this.props.userIsLoading) {
      await this.props.activateUser();
    }
  }

  public render() {
    return <LoadingPage />;
  }
}
