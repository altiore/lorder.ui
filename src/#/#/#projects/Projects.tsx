import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TableCellProps } from 'react-virtualized';

import { IUser, ROLE } from '@types';
import { Confirmation } from '@components/Dialogs/Confirmation';
import { Page } from '@components/Page';
import TableVirtualized, { ColumnType } from '@components/TableVirtualized';
import { CreateProjectPopup } from '#/@common/CreateProjectPopup';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';
import { ACCESS_LEVEL, Project } from '#/@store/projects';

export interface IProjectsProps {
  acceptInvitation: (projectId: number) => any;
  classes: any;
  closeDialog: any;
  defaultProjectId: number;
  findUserById: (id: number) => IUser | undefined;
  getProjects: any;
  goToProject: any;
  hasRole: any;
  openDialog: any;
  ownOnly: boolean;
  projectList: Project[];
  removeProject: any;
  removeProjectByAdmin: any;
  showError: any;
  userRole: ROLE;
  height: number;
  isWidthSm: boolean;
  theme: Theme;
}

export interface IProjectsState {
  sortBy: number | string;
  sortDirection: string;
}

export class Projects extends React.Component<RouteComponentProps<{}> & IProjectsProps, IProjectsState> {
  state = {
    sortBy: 'title',
    sortDirection: 'ASC',
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { classes, hasRole, ownOnly, projectList, height: pHeight, isWidthSm, theme } = this.props;
    let columns: ColumnType[] = [
      { label: `Название (${projectList.length})`, order: 1, isShown: true, dataKey: 'title' },
      { label: '', order: 20, isShown: true, dataKey: 'id', width: 100, component: this.renderRemove },
    ];
    if (!isWidthSm) {
      columns = columns.concat([
        // { label: 'Бюджет', order: 3, isShown: hasRole(ROLE.SUPER_ADMIN), dataKey: 'monthlyBudget' },
        { label: 'Потрачено Времени', order: 4, isShown: true, dataKey: 'fullProjectTimeHumanize' },
        {
          component: this.renderValue,
          dataKey: 'valueSum',
          isShown: hasRole(ROLE.SUPER_ADMIN),
          label: 'Ценность',
          order: 5,
        },
        { label: 'Публичный', order: 8, isShown: true, dataKey: 'uuid', width: 140, component: this.renderPublished },
      ]);
    }
    if (!ownOnly && hasRole(ROLE.SUPER_ADMIN) && !isWidthSm) {
      columns.push({
        component: this.renderUser,
        dataKey: 'ownerId',
        isShown: true,
        label: 'Владелец',
        order: 2,
      });
    }
    const rows = projectList.sort(this.sortState());
    const { sortBy, sortDirection } = this.state;
    const height = pHeight - 69.6 - (isWidthSm ? 0 : theme.spacing(4)) - (ownOnly ? 37 : 0);
    return (
      <LayoutLeftDrawer>
        <Page>
          <TableVirtualized
            columns={columns}
            rows={rows}
            height={height}
            sortBy={sortBy}
            sortDirection={sortDirection}
            sort={this.sortTable}
            onRowClick={ownOnly ? this.handleRowClick : undefined}
          />
          <div className={classes.row}>
            {ownOnly && (
              <Button size="large" variant="outlined" color="primary" onClick={this.createProject}>
                <Typography variant="caption" noWrap>
                  {'Создать проект'}
                </Typography>
              </Button>
            )}
          </div>
        </Page>
      </LayoutLeftDrawer>
    );
  }

  private renderPublished = ({ cellData }: TableCellProps) => {
    return cellData ? 'Да' : 'Нет';
  };

  private renderUser = ({ cellData }: TableCellProps): any => {
    return this.getUserEmail(cellData);
  };

  private sortTable = ({ sortBy, sortDirection }: any, w: any) => {
    this.setState({ sortBy, sortDirection });
  };

  private sortState = () => {
    let { sortBy } = this.state;
    if (sortBy === 'ownerId') {
      return (a: Project, b: Project) => {
        const aU = this.getUserEmail(a.ownerId as number);
        const bU = this.getUserEmail(b.ownerId as number);
        return this.getSortFunctionFromDirection(aU, bU);
      };
    }
    if (sortBy === 'fullProjectTimeHumanize') {
      sortBy = 'timeSum';
    }
    return (a: Project, b: Project) => this.getSortFunctionFromDirection(a[sortBy], b[sortBy]);
  };

  private getSortFunctionFromDirection = (a: any, b: any) => {
    const { sortDirection } = this.state;
    if (sortDirection === 'ASC') {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  };

  private createProject = () => this.props.openDialog(CreateProjectPopup, { scroll: 'body' });

  private handleRowClick = async ({ rowData, event }: any) => {
    event.stopPropagation();
    if (rowData.accessLevel === ACCESS_LEVEL.WHITE && typeof rowData.id === 'number') {
      await this.props.acceptInvitation(rowData.id);
      this.props.goToProject(rowData.id);
    } else {
      this.props.goToProject(rowData.id);
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
      this.props.openDialog(
        <Confirmation
          text="Это действие нельзя будет отменить! Вы уверены, что хотите удалить проект безвозвратно?"
          onConfirm={this.removeProjectById(id)}
        />
      );
    } else {
      this.props.showError({
        message: 'Только владелец может удалить проект!',
        title: 'Недостаточно прав',
      });
    }
  };

  private removeProjectById = (id: any) => async () => {
    if (this.props.ownOnly) {
      await this.props.removeProject(id);
    } else {
      await this.props.removeProjectByAdmin(id);
    }
    this.props.closeDialog();
  };

  private getUserEmail = (id?: number): number | string => {
    if (!id) {
      return 'NOT FOUND';
    }
    const user = this.props.findUserById(id);
    if (user) {
      return user.email;
    }
    return id;
  };

  private renderRemove = ({ cellData, rowData }: TableCellProps) => (
    <Fab size="small" color="primary" onClick={this.handleRemoveClick(cellData, rowData.accessLevel)}>
      <ClearIcon />
    </Fab>
  );

  private renderValue = ({ cellData, rowData }: TableCellProps) => (
    <Chip color="secondary" label={`${(cellData * 20).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$`} />
  );
}
