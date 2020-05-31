import React, { memo, useCallback } from 'react';
import MediaQuery from 'react-responsive';
import { Route, Switch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import TimerIcon from '@material-ui/icons/Timer';

import { AccountMenu } from '#/@common/account-menu';
import { CreateProjectPopup } from '#/@common/CreateProjectPopup';
import { LinkIconButton } from '#/@common/LinkIconButton';
import { Project } from '#/@store/projects';
import { TASKS_ROUTE } from '#/@store/router';
import { IUserWorkData } from '#/@store/user-works';

import CurrentTaskButton from './CurrentTaskButton';
import Filters from './Filters';
import ProjectButton from './ProjectButton';
import ProjectSelect from './ProjectSelect';
import { useStyles } from './styles';

import { INotification, IProject } from '@types';

export interface IHeaderProps {
  isPaused: boolean;
  openDialog: any;
  openTaskModal: any;
  push: any;
  selectedProject: Project;
  showSuccess: (ev: INotification) => any;
  showWarning: (ev: INotification) => any;
  startUserWork: (data: IUserWorkData) => any;
}

export const HeaderTsx: React.FC<IHeaderProps> = memo(
  ({ isPaused, openDialog, openTaskModal, push, selectedProject, showSuccess, showWarning, startUserWork }) => {
    const classes = useStyles();

    const theme = useTheme();

    const openCreateProject = useCallback(() => {
      openDialog(CreateProjectPopup, { scroll: 'body' });
    }, [openDialog]);

    const selectProject = useCallback(
      async (project: IProject) => {
        const projectId = project.id as number;
        if (selectedProject && selectedProject.id !== projectId) {
          showSuccess({
            action: {
              callback: async () => {
                await startUserWork({
                  projectId,
                });
                showWarning({
                  action: {
                    callback: openTaskModal,
                    label: 'Редактировать',
                  },
                  message: 'Хотите редактировать созданную задачу?',
                  title: `Задача для проекта "${project.title}" успешно создана!`,
                });
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
      [openTaskModal, push, selectedProject, showSuccess, showWarning, startUserWork]
    );

    const nullComponent = useCallback(() => null, []);

    return (
      <AppBar classes={{ root: classes.appBarRoot }} position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <LinkIconButton to="/" color="secondary">
            <TimerIcon fontSize="large" color="inherit" className={classes.timerIco} />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            {Boolean(selectedProject) && (
              <ProjectButton selectProject={selectProject} createTask={openTaskModal} inProgress={!isPaused} />
            )}
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
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
);
