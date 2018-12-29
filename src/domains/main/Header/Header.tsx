import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import * as React from 'react';

import { ROLE } from 'src/@types';
import { CreateProjectPopup } from 'src/domains/@common/CreateProjectPopup';
import { LinkIconButton } from 'src/domains/@common/LinkIconButton';
import { Project } from 'src/store/projects';
import { IUserWorkData } from 'src/store/tasks/user-works';
import { ProjectButton } from './ProjectButton';
import { ProjectField } from './ProjectField';

export interface IHeaderProps {
  classes: any;
  theme: Theme;
  logOut: any;
  openDialog: any;
  openedProject: Project;
  projects: Array<Project & { percent: string; time: string }>;
  push: any;
  selectedProject: Project;
  startUserWork: (data: IUserWorkData) => any;
  userAvatar?: string;
  userEmail: string;
  userRole: ROLE;
  width?: number;
}

export interface IHeaderState {
  expanded: boolean;
}

const projectFilter = (projects: Project[]) => (project: Project) =>
  ~projects.findIndex(pr => pr && project && pr.id === project.id);

export class HeaderTsx extends React.Component<IHeaderProps> {
  state = {
    anchorEl: null,
    expanded: false,
  };

  render() {
    const { classes, theme, projects, selectedProject, logOut, userAvatar, userEmail, userRole, width } = this.props;
    const { expanded } = this.state;
    let filteredProjects: Array<Project & { percent: string; time: string }> = projects;
    if (!expanded) {
      filteredProjects = selectedProject ? projects.filter(projectFilter([selectedProject])) : [];
    }
    return (
      <AppBar position="static" className={classes.appBar} color="primary">
        <Toolbar>
          <LinkIconButton to="/" color="secondary">
            <AvTimerIcon />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            {filteredProjects.map(project => (
              <ProjectButton
                key={project.id}
                {...project}
                inProgress={selectedProject && project.id === selectedProject.id}
              />
            ))}
            {expanded && (
              <IconButton color="secondary" onClick={this.openCreateProject} className={classes.expandButton}>
                <AddIcon />
              </IconButton>
            )}
            {width && width > theme.breakpoints.values.sm ? (
              <IconButton color="secondary" onClick={this.toggleExpandProjects} className={classes.expandButton}>
                {expanded ? <ChevronLeftIcon /> : <MoreHorizIcon />}
              </IconButton>
            ) : (
              <>
                <IconButton color="secondary" onClick={this.menuOpen} className={classes.expandButton}>
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  classes={{ paper: classes.menu }}
                >
                  <ProjectField onClick={this.selectProject} onOpenInNew={this.handleOpenInNew} />
                </Menu>
              </>
            )}
          </div>
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
    );
  }

  private toggleExpandProjects = () => this.setState(({ expanded }: IHeaderState) => ({ expanded: !expanded }));

  // private hideProjects = () => this.setState({ expanded: false });
  private openCreateProject = () => this.props.openDialog(CreateProjectPopup);

  private menuOpen = (event: React.SyntheticEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: null });
  };

  private selectProject = (projectId: number) => async () => {
    const { selectedProject, startUserWork, push } = this.props;
    this.setState({ anchorEl: null });
    if (selectedProject.id !== projectId) {
      await startUserWork({
        projectId,
      });
    }
    push('/');
  };

  private handleOpenInNew = (project: Project) => async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { selectedProject, startUserWork, push } = this.props;
    this.setState({ anchorEl: null });
    if (selectedProject.id !== project.id) {
      await startUserWork({
        projectId: project.id as number,
        title: 'Обзор',
      });
    }
    push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);
  };
}
