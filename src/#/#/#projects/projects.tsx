import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { ICrudColumn } from '@components/Crud/Crud';
import { Page } from '@components/Page';

import { createProjectDialogProps, CreateProjectPopup } from '#/@common/create-project-popup';
import Crud from '#/@common/crud';
import { Project } from '#/@store/projects';

import { ACCESS_LEVEL, IUser, PROJECT_TYPE, ROLE } from '@types';

const GET_PROJECT_TYPE = {
  [PROJECT_TYPE.SOCIALLY_USEFUL]: 'Социальный',
  [PROJECT_TYPE.PERSONALLY_USEFUL]: 'Личный',
};

export interface IProjectsProps {
  defaultProjectId: number;
  findUserById: (id: number) => IUser | undefined;
  getProjects: any; // не используется
  goToProject: any;
  hasRole: any;
  openDialog: any;
  ownOnly: boolean;
  projectList: Project[];
  removeProject: any;
  removeProjectByAdmin: any;
  showError: any;
  userRole: ROLE;
}

export interface IProjectsState {
  sortBy: number | string;
  sortDirection: string;
}

export class Projects extends React.Component<RouteComponentProps<{}> & IProjectsProps, IProjectsState> {
  render() {
    const { hasRole, ownOnly, projectList } = this.props;

    const COLUMNS: ICrudColumn[] = [
      { name: 'title', path: 'title', title: 'Название' },
      {
        name: 'timeSum',
        path: 'timeSum',
        title: 'Потрачено Времени',
      },
      { name: 'uuid', path: 'uuid', title: 'Публичный' },
      { name: 'type', path: 'type', title: 'Тип' },
    ];

    if (!ownOnly && hasRole(ROLE.SUPER_ADMIN)) {
      COLUMNS.push({ name: 'ownerId', path: 'ownerId', title: 'Владелец' });
    }

    if (hasRole(ROLE.SUPER_ADMIN)) {
      COLUMNS.push({ name: 'valueSum', path: 'valueSum', title: 'Ценность' });
    }

    return (
      <Page>
        <Crud
          entityName="Проекты"
          deleteItem={this.handleRemoveClickNew}
          columns={COLUMNS}
          rows={this.rowsToDisplay(projectList)}
        />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
          }}
        >
          {ownOnly && (
            <Button size="large" variant="outlined" color="primary" onClick={this.createProject}>
              <Typography variant="caption" noWrap>
                {'Создать проект'}
              </Typography>
            </Button>
          )}
        </div>
      </Page>
    );
  }
  // TODO: Фильтрация по потраченному времени
  private rowsToDisplay = (rows: Project[]) => {
    return rows.map((project: Project) => ({
      ...project,
      ownerId: this.getUserEmail(project.ownerId),
      timeSum: project.fullProjectTimeHumanize,
      type: GET_PROJECT_TYPE[project.type] || 'N/A',
      uuid: project.uuid ? 'Да' : 'Нет',
      valueSum: `${(project.valueSum ? project.valueSum * 50 : 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$`,
    }));
  };

  private createProject = () => this.props.openDialog(CreateProjectPopup, createProjectDialogProps);

  private handleRemoveClickNew = (projectId: number | undefined) => {
    const accessLevel: ACCESS_LEVEL | undefined = this.props.projectList.filter(
      (prj: Project) => prj.id === projectId
    )?.[0]?.accessLevel;
    if (projectId === this.props.defaultProjectId) {
      this.props.showError({
        message: 'Этот проект нельзя удалить',
        title: 'Недостаточно прав',
      });
      return;
    }
    if (accessLevel === ACCESS_LEVEL.VIOLET || this.props.userRole === ROLE.SUPER_ADMIN) {
      this.removeProjectById(projectId);
    } else {
      this.props.showError({
        message: 'Только владелец может удалить проект!',
        title: 'Недостаточно прав',
      });
    }
  };

  private removeProjectById = async (id: any) => {
    if (this.props.ownOnly) {
      await this.props.removeProject(id);
    } else {
      await this.props.removeProjectByAdmin(id);
    }
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
}
