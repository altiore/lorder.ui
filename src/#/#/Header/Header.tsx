import React, { memo, useCallback } from 'react';
import MediaQuery from 'react-responsive';
import { Route, Switch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

import LorderLogo from '@components/@icons/LorderLogo';

import AccountMenu from '#/@common/account-menu';
import { createProjectDialogProps, CreateProjectPopup } from '#/@common/CreateProjectPopup';
import { LinkIconButton } from '#/@common/LinkIconButton';
import { Project } from '#/@store/projects';
import { TASKS_ROUTE } from '#/@store/router';
import { IUserWorkData } from '#/@store/user-works';

import ActiveProject from './ActiveProject';
import CurrentTaskButton from './CurrentTaskButton';
import Filters from './Filters';
import HiddenProject from './HiddenProject';
import ProjectSelect from './ProjectSelect';
import { useStyles } from './styles';

import { INotification, IProject } from '@types';

export interface IHeaderProps {
  openDialog: any;
  openTaskModal: any;
  push: any;
  selectedProject: Project;
  showSuccess: (ev: INotification) => any;
  showWarning: (ev: INotification) => any;
  startUserWork: (data: IUserWorkData) => any;
}

export const HeaderTsx: React.FC<IHeaderProps> = memo(
  ({ openDialog, openTaskModal, push, selectedProject, showSuccess, showWarning, startUserWork }) => {
    const classes = useStyles();

    const theme = useTheme();

    const openCreateProject = useCallback(() => {
      openDialog(CreateProjectPopup, createProjectDialogProps);
    }, [openDialog]);

    const selectProject = useCallback(
      async (project: IProject) => {
        const projectId = project.id as number;
        if (selectedProject && selectedProject.id !== projectId) {
          showSuccess({
            action: {
              callback: async () => {
                // TODO: добавить функционал создания задачи
                alert('TODO: добавить функционал создания задачи');
                // await startUserWork({
                //   projectId,
                // });
                // showWarning({
                //   action: {
                //     callback: openTaskModal,
                //     label: 'Редактировать',
                //   },
                //   message: 'Хотите редактировать созданную задачу?',
                //   title: `Задача для проекта "${project.title}" успешно создана!`,
                // });
              },
              label: 'Создать',
            },
            message: 'Создать задчу для обзора?',
            title: `Доска проекта "${project.title}"`,
          });
          push(`/projects/${project.id}`);
        } else {
          push(`/projects/${project.id}`);
        }
      },
      [push, selectedProject, showSuccess /*, showWarning, openTaskModal, startUserWork*/]
    );

    const nullComponent = useCallback(() => null, []);

    return (
      <AppBar classes={{ root: classes.appBarRoot }} position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <LinkIconButton to="/" color="secondary">
            <LorderLogo className={classes.timerIco} />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            <ActiveProject selectProject={selectProject} />
            <MediaQuery minWidth={theme.breakpoints.values.md}>
              <HiddenProject selectProject={selectProject} hidden />
            </MediaQuery>
            <ProjectSelect openProject={selectProject} />
            <Tooltip title="Создать новый проект" placement="right">
              <IconButton color="secondary" onClick={openCreateProject} className={classes.expandButton}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.grow}>
            <Switch>
              <Route path={TASKS_ROUTE()} exact component={Filters} />
              <Route component={nullComponent} />
            </Switch>
          </div>
          <MediaQuery minWidth={theme.breakpoints.values.md}>
            <CurrentTaskButton />
          </MediaQuery>
          <div>
            <AccountMenu menuId="header-menu" />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
);
