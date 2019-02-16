import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import * as React from 'react';

import { INotification, ROLE } from 'src/@types';
import { CreateProjectPopup } from 'src/domains/@common/CreateProjectPopup';
import { LinkIconButton } from 'src/domains/@common/LinkIconButton';
import { Project } from 'src/store/projects';
import { IUserWorkData } from 'src/store/tasks/user-works';
import { ProjectButton } from './ProjectButton';
import { ProjectField } from './ProjectField';
import TimerIcon from './timer.svg';

type ProjectType = Partial<Project> & { percent: string | number; time: string };
type ProjectsArrayType = ProjectType[];

export interface IHeaderProps {
  classes: any;
  theme: Theme;
  logOut: any;
  openDialog: any;
  openedProject: Project;
  openTaskModal: any;
  projects: ProjectsArrayType;
  push: any;
  selectedProject: Project;
  showWarning: (ev: INotification) => any;
  startUserWork: (data: IUserWorkData) => any;
  userAvatar?: string;
  userEmail: string;
  userRole: ROLE;
  width?: number;
}

export interface IHeaderState {
  expanded: boolean;
}

const projectFilter = (projects: Project[] = []) => (project: ProjectType) =>
  ~projects.findIndex(pr => pr && project && pr.id === project.id);

export class HeaderTsx extends React.Component<IHeaderProps> {
  state = {
    anchorEl: null,
    expanded: false,
  };

  timer: any = null;

  componentWillUnmount(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { classes, theme, projects, selectedProject, logOut, userAvatar, userEmail, userRole, width } = this.props;
    const { expanded } = this.state;
    let filteredProjects: ProjectsArrayType = projects;
    if (!expanded) {
      filteredProjects = selectedProject ? projects.filter(projectFilter([selectedProject])) : [];
    }
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <LinkIconButton to="/" color="secondary">
            <TimerIcon />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            {filteredProjects.map(project => (
              <ProjectButton
                key={project.id}
                selectProject={this.selectProject(project as Project)}
                onOpenInNew={this.handleOpenInNew(project as Project)}
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

  private toggleExpandProjects = () => {
    this.setState(({ expanded }: IHeaderState) => {
      if (!expanded) {
        this.timer = setTimeout(() => {
          this.toggleExpandProjects();
        }, 15000);
      } else {
        this.clearTimeout();
      }
      return { expanded: !expanded };
    });
  };

  private clearTimeout = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  private openCreateProject = () => this.props.openDialog(CreateProjectPopup, { scroll: 'body' });

  private menuOpen = (event: React.SyntheticEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: null });
  };

  private selectProject = (project: Project) => async () => {
    const projectId = project.id as number;
    const { selectedProject, startUserWork, push } = this.props;
    this.clearTimeout();
    this.setState({ anchorEl: null, expanded: false });
    if (selectedProject.id !== projectId) {
      this.props.showWarning({
        action: {
          callback: this.props.openTaskModal,
          label: 'Редактировать созданную задачу',
        },
        message: 'Новая задача в этом проекте успешно создана!',
        title: `Вы выбрали проект "${project.title}"!`,
      });
      await startUserWork({
        projectId,
      });
    }
    push('/');
  };

  private handleOpenInNew = (project: Project) => async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { selectedProject, startUserWork, push } = this.props;
    this.clearTimeout();
    this.setState({ anchorEl: null, expanded: false });
    push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);
    if (!selectedProject || selectedProject.id !== project.id) {
      const taskTitle = 'Обзор';
      await startUserWork({
        projectId: project.id as number,
        title: taskTitle,
      });
      this.props.showWarning({
        action: {
          callback: this.props.openTaskModal,
          label: 'Редактировать созданную задачу',
        },
        message: `Задача "${taskTitle}" успешно создана!`,
        title: `Вы начали работу над проектом "${project.title}"!`,
      });
    }
  };
}
