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
import { createProjectDialogProps, CreateProjectPopup } from '#/@common/create-project-popup';
import { LinkIconButton } from '#/@common/link-icon-button';
import { TASKS_ROUTE } from '#/@store/router';

import ActiveProject from './active-project';
import CurrentTaskButton from './current-task-button';
import Filters from './filters';
import HiddenProject from './hidden-project';
import ProjectSelect from './project-select';
import { useStyles } from './styles';

import { IProject } from '@types';

export interface IHeaderProps {
  goToProjectWithAsk: any;
  openDialog: any;
}

export const HeaderTsx: React.FC<IHeaderProps> = memo(({ goToProjectWithAsk, openDialog }) => {
  const classes = useStyles();

  const theme = useTheme();

  const openCreateProject = useCallback(() => {
    openDialog(CreateProjectPopup, createProjectDialogProps);
  }, [openDialog]);

  const selectProject = useCallback(
    async (project: IProject) => {
      await goToProjectWithAsk(project);
    },
    [goToProjectWithAsk]
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
          {!selectProject && (
            <MediaQuery minWidth={theme.breakpoints.values.md}>
              <HiddenProject selectProject={selectProject} hidden />
            </MediaQuery>
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
          <AccountMenu menuId="header-menu" />
        </div>
      </Toolbar>
    </AppBar>
  );
});
