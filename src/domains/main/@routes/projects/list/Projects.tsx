import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/components/Page';
import { Table } from 'src/components/Table';
import { CreateProjectPopup } from 'src/domains/@common/CreateProjectPopup';
import { ACCESS_LEVEL, Project } from 'src/store/projects';

export interface IProjectsProps {
  acceptInvitation: (projectId: number) => any;
  classes: any;
  closeDialog: any;
  getProjects: any;
  goToProject: any;
  openDialog: any;
  projectList: Project[];
  removeProject: any;
}

export class Projects extends React.Component<RouteComponentProps<{}> & IProjectsProps, {}> {
  state = {
    page: 0,
    perPage: 10,
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { classes, projectList } = this.props;
    return (
      <Page className={classes.root}>
        {projectList && projectList.length ? (
          <Table items={projectList} renderItem={this.renderItem}>
            <TableHead>
              <TableRow>
                <TableCell>Название проекта</TableCell>
                <TableCell numeric>Месячный бюджет</TableCell>
                <TableCell numeric>Потречено времени</TableCell>
                <TableCell numeric>Полная стоимость</TableCell>
                <TableCell style={{ width: 50 }} />
              </TableRow>
            </TableHead>
          </Table>
        ) : (
          <Grid item xs={12}>
            <img src={'/'} />
          </Grid>
        )}
        <Button size="large" variant="contained" color="primary" onClick={this.createProject}>
          <Typography variant="caption" noWrap>
            {'Создать проект'}
          </Typography>
        </Button>
      </Page>
    );
  }

  private renderItem = ({ id, accessLevel, title, monthlyBudget, fullProjectTimeHumanize, valueSum }: Project) => {
    const { classes } = this.props;
    return (
      <TableRow key={id} className={classes.row} hover onClick={this.handleRowClick(id, accessLevel)}>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        {accessLevel === ACCESS_LEVEL.WHITE ? (
          <TableCell colSpan={3}>
            <Typography color={'error'}>Нажмите на строку проекта, чтоб принять приглашение</Typography>
          </TableCell>
        ) : (
          <React.Fragment>
            <TableCell numeric>{monthlyBudget}</TableCell>
            <TableCell numeric>{fullProjectTimeHumanize}</TableCell>
            <TableCell numeric>{valueSum}</TableCell>
          </React.Fragment>
        )}
        <TableCell>
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private createProject = () => this.props.openDialog(CreateProjectPopup);

  private handleRowClick = (id: number | undefined, accsessLevel?: ACCESS_LEVEL) => async () => {
    if (accsessLevel === ACCESS_LEVEL.WHITE && typeof id === 'number') {
      await this.props.acceptInvitation(id);
      this.props.goToProject(id);
    } else {
      this.props.goToProject(id);
    }
  };

  private handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.removeProject(id);
  };
}
