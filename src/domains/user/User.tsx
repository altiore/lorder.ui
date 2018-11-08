import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import * as React from 'react';

import { StartStopBtn } from 'src/components/StartStopBtn';
import { StartForm } from 'src/domains/main/dashboard/StartForm';
import { ProjectButton } from 'src/domains/main/ProjectButton';

export interface IUserProps {
  classes?: any;
}

export interface IUserState {
  isOpen?: boolean;
}

export class UserTsx extends React.Component<IUserProps, IUserState> {
  public render() {
    const {} = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton>
              <AvTimerIcon />
            </IconButton>
            <ProjectButton time={'30 m'} title={'Altiore'} percent={'30'} />
            <div className={classes.grow} />
            <div>
              <Avatar
                // onClick={this.logOut}
                alt="Remy Sharp"
                src={'/d-avatar.png'}
                className={classes.avatar}
              />
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Grid container spacing={16}>
            <Grid item xs={9} justify={'center'}>
              <StartForm />

              <List>
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <StartStopBtn isStarted={true} />
                  </ListItemIcon>
                  <Button className={classes.buttonTitle}>Текущая задача</Button>
                  <ListItemText
                    secondary={
                      <Tooltip placement={'right'} title={'Нажмите, чтоб раскрыть подробности'}>
                        <Button>10:20</Button>
                      </Tooltip>
                    }
                    className={classes.duration}
                  />
                </ListItem>

                <div className={classes.end}>
                  <Radio checked={true} value="a" name="radio-button-demo" aria-label="A" />
                  <Radio checked={false} value="b" name="radio-button-demo" aria-label="B" />
                  <Radio checked={false} value="c" name="radio-button-demo" aria-label="C" />
                  <Radio checked={false} value="d" color="default" name="radio-button-demo" aria-label="D" />
                  <Radio checked={false} value="e" color="default" name="radio-button-demo" aria-label="E" />
                </div>

                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <StartStopBtn isStarted={false} />
                  </ListItemIcon>
                  <Button className={classes.buttonTitle}>
                    <Typography>Предыдущая задача</Typography>
                  </Button>
                  <ListItemText
                    secondary={
                      <Tooltip placement={'right'} title={'Нажмите, чтоб раскрыть подробности'}>
                        <Button>10:20</Button>
                      </Tooltip>
                    }
                    className={classes.duration}
                  />
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <StartStopBtn isStarted={false} />
                  </ListItemIcon>
                  <Button className={classes.buttonTitle}>
                    <Typography>Перерыв</Typography>
                  </Button>
                  <ListItemText
                    secondary={
                      <Tooltip placement={'right'} title={'Нажмите, чтоб раскрыть подробности'}>
                        <Button>10:20</Button>
                      </Tooltip>
                    }
                    className={classes.duration}
                  />
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <StartStopBtn isStarted={false} />
                  </ListItemIcon>
                  <Button className={classes.buttonTitle}>
                    <Typography>Следующая задача</Typography>
                  </Button>
                  <ListItemText
                    secondary={
                      <Tooltip placement={'right'} title={'Нажмите, чтоб раскрыть подробности'}>
                        <Button>10:20</Button>
                      </Tooltip>
                    }
                    className={classes.duration}
                  />
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <StartStopBtn isStarted={false} />
                  </ListItemIcon>
                  <Button className={classes.buttonTitle}>
                    <Typography>Дай угадаю!</Typography>
                  </Button>
                  <ListItemText
                    secondary={
                      <Tooltip placement={'right'} title={'Нажмите, чтоб раскрыть подробности'}>
                        <Button>10:20</Button>
                      </Tooltip>
                    }
                    className={classes.duration}
                  />
                </ListItem>
              </List>

              <div className={classes.end}>
                <Button style={{ textTransform: 'none' }} variant={'outlined'} color={'primary'}>
                  <Typography>Загрузить еще...</Typography>
                </Button>
              </div>
            </Grid>
            <Grid item xs={3}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Задача</TableCell>
                    <TableCell numeric>Проект</TableCell>
                    <TableCell numeric>Время</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell numeric>Сделать</TableCell>
                    <TableCell numeric>Altiore</TableCell>
                    <TableCell numeric>30:20:21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell numeric>Сделать</TableCell>
                    <TableCell numeric>Altiore</TableCell>
                    <TableCell numeric>30:20:21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell numeric>Сделать</TableCell>
                    <TableCell numeric>Altiore</TableCell>
                    <TableCell numeric>30:20:21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell numeric>Сделать</TableCell>
                    <TableCell numeric>Altiore</TableCell>
                    <TableCell numeric>30:20:21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell numeric>Сделать</TableCell>
                    <TableCell numeric>Altiore</TableCell>
                    <TableCell numeric>30:20:21</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
