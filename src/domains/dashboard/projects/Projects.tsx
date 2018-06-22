import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Project } from 'src/store/projects';

const src = 'https://cache.harvestapp.com/assets/onboarding/landing-projects@2x-e00081706c6ce0b93cf18c21c6e488f1fc913045992fc34dd18e5e290bc971cb.png';

export interface IProjectsProps {
  classes: any;
  getAllProjects: any;
  projectList: Project[];
}

export class Projects extends React.Component<RouteComponentProps<{}> & IProjectsProps, {}> {
  public componentDidMount() {
    this.props.getAllProjects();
  }

  public handleRowClick = (id: number|undefined) => () => {
    console.log('handleRowClick', id);
  }

  public handleRemoveClick = (id: number|undefined) => (e: any) => {
    e.stopPropagation();
    console.log('handleRemoveClick', id);
  }

  public render() {
    const { classes, match, projectList } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {projectList && projectList.length ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Название проекта</TableCell>
                    <TableCell numeric>Месячный бюджет</TableCell>
                    <TableCell numeric>Потрачено</TableCell>
                    <TableCell numeric>Полная стоимость</TableCell>
                    <TableCell style={{width: 50}} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectList.map(({ id, title, monthlyBudget }) => {
                    return (
                      <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                        <TableCell component="th" scope="row">
                          {title}
                        </TableCell>
                        <TableCell numeric>{monthlyBudget}</TableCell>
                        <TableCell numeric>50</TableCell>
                        <TableCell numeric>1200</TableCell>
                        <TableCell>
                          <IconButton onClick={this.handleRemoveClick(id)}>
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
            <Link to={`${match.path}/new`}>
              <Button size='large' variant='contained' color='primary'>
                <Typography variant='caption' noWrap>{'Создать проект'}</Typography>
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
