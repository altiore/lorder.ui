import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IUser } from 'src/store/users';

const src = 'https://cache.harvestapp.com/assets/onboarding/landing-projects@2x-e00081706c6ce0b93cf18c21c6e488f1fc913045992fc34dd18e5e290bc971cb.png';

export interface IUsersProps {
  classes: any;
  fetchUsers: any;
  userList: IUser[];
}

export class Users extends React.Component<RouteComponentProps<{}> & IUsersProps, {}> {
  public componentDidMount() {
    this.props.fetchUsers();
  }

  public handleRowClick = (id: number|undefined) => () => {
    console.log('handleRowClick', id);
  }

  public handleRemoveClick = (id: number|undefined) => (e: any) => {
    e.stopPropagation();
    console.log('handleRemoveClick', id);
  }

  public render() {
    const { classes, userList } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {userList && userList.length ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Телефон</TableCell>
                    <TableCell numeric>Статус</TableCell>
                    <TableCell numeric>Способ получения средств</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell style={{width: 42}} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map(({ id, email, tel, status, paymentMethod, roles }) => {
                    return (
                      <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                        <TableCell component="th" scope="row">
                          {email}
                        </TableCell>
                        <TableCell>{tel}</TableCell>
                        <TableCell numeric>{status}</TableCell>
                        <TableCell numeric>{paymentMethod}</TableCell>
                        <TableCell>{roles[0].name}</TableCell>
                        <TableCell>
                          <IconButton onClick={this.handleRemoveClick(id)} style={{height: 42}}>
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Grid item xs={12}>
                <img src={src} />
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
