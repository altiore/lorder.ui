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

import { ROLE } from 'src/@types';
import { Page } from 'src/components/Page';
import { Table } from 'src/components/Table';
import { CheckRole } from 'src/domains/@common/CheckRole';
import { CreateProjectPopup } from 'src/domains/@common/CreateProjectPopup';
import { LayoutLeftDrawer } from 'src/domains/@common/LayoutLeftDrawer';
import { ACCESS_LEVEL, Project } from 'src/store/projects';

export interface IProjectsProps {
  acceptInvitation: (projectId: number) => any;
  classes: any;
  closeDialog: any;
  defaultProjectId: number;
  getProjects: any;
  goToProject: any;
  openDialog: any;
  projectList: Project[];
  removeProject: any;
  showError: any;
  userRole: ROLE;
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
      <LayoutLeftDrawer>
        <Page className={classes.root}>
          {projectList && projectList.length ? (
            <Table items={projectList} renderItem={this.renderItem}>
              <TableHead>
                <TableRow>
                  <TableCell>Название проекта</TableCell>
                  <CheckRole role={ROLE.SUPER_ADMIN}>
                    <TableCell numeric>Месячный бюджет</TableCell>
                  </CheckRole>
                  <TableCell numeric>Потречено времени</TableCell>
                  <CheckRole role={ROLE.SUPER_ADMIN}>
                    <TableCell numeric>Полная стоимость</TableCell>
                  </CheckRole>
                  <TableCell style={{ width: 50 }} />
                </TableRow>
              </TableHead>
            </Table>
          ) : (
            <Grid item xs={12}>
              <img src={'/'} />
            </Grid>
          )}
          <Button size="large" variant="outlined" color="primary" onClick={this.createProject}>
            <Typography variant="caption" noWrap>
              {'Создать проект'}
            </Typography>
          </Button>
        </Page>
      </LayoutLeftDrawer>
    );
  }

  private renderItem = ({ id, accessLevel, title, monthlyBudget, fullProjectTimeHumanize, valueSum }: Project) => {
    const { classes, userRole } = this.props;
    return (
      <TableRow key={id} className={classes.row} hover onClick={this.handleRowClick(id, accessLevel)}>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        {accessLevel === ACCESS_LEVEL.WHITE ? (
          <TableCell colSpan={userRole === ROLE.SUPER_ADMIN ? 3 : 1}>
            <Typography color={'error'}>Нажмите на строку проекта, чтоб принять приглашение</Typography>
          </TableCell>
        ) : (
          <>
            <CheckRole role={ROLE.SUPER_ADMIN}>
              <TableCell numeric>{monthlyBudget}</TableCell>
            </CheckRole>
            <TableCell numeric>{fullProjectTimeHumanize}</TableCell>
            <CheckRole role={ROLE.SUPER_ADMIN}>
              <TableCell numeric>{valueSum}</TableCell>
            </CheckRole>
          </>
        )}
        <TableCell>
          <IconButton onClick={this.handleRemoveClick(id, accessLevel)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private createProject = () => this.props.openDialog(CreateProjectPopup, { scroll: 'body' });

  private handleRowClick = (id: number | undefined, accessLevel?: ACCESS_LEVEL) => async () => {
    if (accessLevel === ACCESS_LEVEL.WHITE && typeof id === 'number') {
      await this.props.acceptInvitation(id);
      this.props.goToProject(id);
    } else {
      this.props.goToProject(id);
    }
  };

  private handleRemoveClick = (id: number | undefined, accessLevel?: ACCESS_LEVEL) => (e: any) => {
    e.stopPropagation();
    if (id === this.props.defaultProjectId) {
      this.props.showError({
        message: 'Этот проект нельзя удалить',
        title: 'Недостаточно прав',
      });
      return;
    }
    if (accessLevel === ACCESS_LEVEL.VIOLET || this.props.userRole === ROLE.SUPER_ADMIN) {
      this.props.removeProject(id);
    } else {
      this.props.showError({
        message: 'Только владелец может удалить проект!',
        title: 'Недостаточно прав',
      });
    }
  };
}
