import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/domains/@common/Page';
import { IUser } from 'src/store/users';

export interface IDashboardProps {
  classes: any;
  deleteUser: any;
  findUserById: (id: number) => IUser;
  fetchDashboard: any;
  patchUser: (data: { user: IUser; role: string }) => void;
  userList: IUser[];
}

export interface IState {
  page: number | string;
  perPage: number | string;
}

export class DashboardJsx extends React.Component<RouteComponentProps<{}> & IDashboardProps, IState> {
  public render() {
    const { classes } = this.props;
    return (
      <Page>
        <div className={classes.play}>
          <Input className={classes.input} />
          <IconButton aria-label="Play" className={classes.button}>
            <PlayArrowRounded fontSize={'large'} color={'inherit'} />
          </IconButton>
        </div>
      </Page>
    );
  }
}
