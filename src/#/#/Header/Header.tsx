import React, { memo, useCallback, useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TimerIcon from '@material-ui/icons/Timer';

import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import { INotification } from '@types';
import { CreateProjectPopup } from '#/@common/CreateProjectPopup';
import { LinkIconButton } from '#/@common/LinkIconButton';
import { Project } from '#/@store/projects';
import { IUserWorkData } from '#/@store/tasks/user-works';
import Filters from './Filters';
import ProjectButton from './ProjectButton';
import { ProjectField } from './ProjectField';
import { RightMenu } from './RightMenu';

import { useStyles } from './styles';

export interface IHeaderProps {
  openDialog: any;
  openTaskModal: any;
  push: any;
  selectedProject: Project;
  showWarning: (ev: INotification) => any;
  startUserWork: (data: IUserWorkData) => any;
}

export interface IHeaderState {
  anchorEl: EventTarget;
  expanded: boolean;
}

const timer: any = null;

export const HeaderTsx: React.FC<IHeaderProps> = memo(
  ({ openDialog, openTaskModal, push, selectedProject, showWarning, startUserWork }) => {
    const classes = useStyles();

    useEffect(() => {
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, []);

    const handleClearTimeout = useCallback(() => {
      if (timer) {
        clearTimeout(timer);
      }
    }, []);

    const openCreateProject = useCallback(() => {
      openDialog(CreateProjectPopup, { scroll: 'body' });
    }, [openDialog]);

    const [anchorEl, setAnchorEl] = useState<any>(null);
    const menuOpen = useCallback(
      (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
      },
      [setAnchorEl]
    );
    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, [setAnchorEl]);

    const selectProject = useCallback(
      (project: Project) => async () => {
        const projectId = project.id as number;
        handleClearTimeout();
        setAnchorEl(null);
        if (selectedProject && selectedProject.id !== projectId) {
          showWarning({
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
            message: 'Просто создайте новую задачу для этого проекта',
            title: `Чтобы переключиться на проект "${project.title}"`,
          });
        }
        push('/');
      },
      [handleClearTimeout, openTaskModal, push, selectedProject, showWarning, startUserWork, setAnchorEl]
    );

    const handleOpenInNew = useCallback(
      (project: Project) => async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        handleClearTimeout();
        setAnchorEl(null);
        push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);
        if (!selectedProject || selectedProject.id !== project.id) {
          const taskTitle = `Обзор проекта "${project.title}" ` + moment().format('DD-MM-YYYY');
          showWarning({
            action: {
              // callback: this.props.openTaskModal,
              callback: async () => {
                await startUserWork({
                  projectId: project.id as number,
                  title: taskTitle,
                });
                showWarning({
                  action: {
                    callback: openTaskModal,
                    label: 'Редактировать',
                  },
                  message: `Хотите ее отредактировать?`,
                  title: `Задача для проекта "${project.title}" успешно создана!`,
                });
              },
              label: 'Создать задачу',
            },
            message: `Хотите создать задачу для него?`,
            title: `Вы перешли к проекту "${project.title}"`,
          });
        }
      },
      [handleClearTimeout, openTaskModal, selectedProject, showWarning, startUserWork, push]
    );

    const nullComponent = useCallback(() => null, []);

    return (
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <LinkIconButton to="/" color="secondary">
            <TimerIcon fontSize="large" color="inherit" className={classes.timerIco} />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            {Boolean(selectedProject) && (
              <ProjectButton selectProject={selectProject} onOpenInNew={handleOpenInNew} inProgress />
            )}
            <IconButton color="secondary" onClick={menuOpen} className={classes.expandButton}>
              <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} classes={{ paper: classes.menu }}>
              <div>
                <ProjectField onClick={selectProject} onOpenInNew={handleOpenInNew} />
              </div>
            </Menu>
            <IconButton color="secondary" onClick={openCreateProject} className={classes.expandButton}>
              <AddIcon />
            </IconButton>
          </div>
          <div className={classes.grow}>
            <Switch>
              <Route path="/projects/:projectId/board" component={Filters} />
              <Route component={nullComponent} />
            </Switch>
          </div>
          <div>
            <RightMenu />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
);
