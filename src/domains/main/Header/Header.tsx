import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import * as React from 'react';

import { ROLE } from 'src/@types';
import { LinkIconButton } from 'src/domains/@common/LinkIconButton';
import { Project } from 'src/store/projects';
import { ProjectButton } from './ProjectButton';

export interface IHeaderProps {
  classes: any;
  logOut: any;
  projects: Array<Project & { percent: string; time: string }>;
  userAvatar?: string;
  userEmail: string;
  userRole: ROLE;
}

export const HeaderTsx: React.FunctionComponent<IHeaderProps> = React.memo(
  ({ classes, projects, logOut, userAvatar, userEmail, userRole }) => (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <LinkIconButton to="/">
          <AvTimerIcon />
        </LinkIconButton>
        {projects.map(project => (
          <ProjectButton key={project.id} {...project} />
        ))}
        <div className={classes.grow} />
        <div>
          <Tooltip
            title={
              <div>
                <p>Вы вошли как: {`${userEmail} (${userRole})`}</p>
                <p>Нажмите, чтобы выйти</p>
              </div>
            }
          >
            <Avatar onClick={logOut} alt={userEmail} src={userAvatar || '/d-avatar.png'} className={classes.avatar} />
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  )
);
