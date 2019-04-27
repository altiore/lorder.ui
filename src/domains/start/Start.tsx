import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LoadingPage } from 'components/LoadingPage';

export interface IStartProps {
  activateUser: () => any;
  userIsLoading: boolean;
}

export class Start extends React.Component<RouteComponentProps<{}> & IStartProps, {}> {
  async componentDidMount() {
    if (!this.props.userIsLoading) {
      await this.props.activateUser();
    }
  }

  render() {
    return <LoadingPage />;
  }
}
