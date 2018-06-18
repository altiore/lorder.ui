import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IMatchParams {
  identifier: string;
}

export interface IStartProps {
  getAuthActivate: (identifier: string) => any,
  userRole: string;
}

export class Start extends React.Component<RouteComponentProps<IMatchParams> | IStartProps, {}> {
  constructor(props: RouteComponentProps<IMatchParams> & IStartProps) {
    super(props);
    const { getAuthActivate, match: { params: { identifier } } } = props;
    getAuthActivate(identifier);
  }

  public render() {
    return (
      <div styleName='login'>
        <CircularProgress size={100} color='secondary'/>
      </div>
    );
  }
}
