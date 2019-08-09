import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TimerIcon from '@material-ui/icons/Timer';
import { Route, Switch } from 'react-router-dom';

import { INotification } from '@types';
import { CreateProjectPopup } from '@domains/@common/CreateProjectPopup';
import { LinkIconButton } from '@domains/@common/LinkIconButton';
import { Project } from '@store/projects';
import { IUserWorkData } from '@store/tasks/user-works';
import Filters from './Filters';
import { ProjectButton } from './ProjectButton';
import { ProjectField } from './ProjectField';
import { RightMenu } from './RightMenu';

type ProjectType = Partial<Project> & { percent: string | number; time: string };
type ProjectsArrayType = ProjectType[];

export interface IHeaderProps {
  classes: any;
  theme: Theme;
  openDialog: any;
  openedProject: Project;
  openTaskModal: any;
  projects: ProjectsArrayType;
  push: any;
  selectedProject: Project;
  showWarning: (ev: INotification) => any;
  startUserWork: (data: IUserWorkData) => any;
  width?: number;
}

export interface IHeaderState {
  anchorEl: EventTarget;
  expanded: boolean;
}

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
    const { classes, selectedProject } = this.props;
    const { expanded } = this.state;
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <LinkIconButton to="/" color="secondary">
            <TimerIcon fontSize="large" color="inherit" className={classes.timerIco} />
          </LinkIconButton>
          <div className={classes.buttonBlock}>
            <ProjectButton
              selectProject={this.selectProject(selectedProject)}
              onOpenInNew={this.handleOpenInNew(selectedProject)}
              {...selectedProject}
              inProgress
            />
            {expanded && (
              <IconButton color="secondary" onClick={this.openCreateProject} className={classes.expandButton}>
                <AddIcon />
              </IconButton>
            )}
            <IconButton color="secondary" onClick={this.menuOpen} className={classes.expandButton}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose('anchorEl')}
              classes={{ paper: classes.menu }}
            >
              <ProjectField onClick={this.selectProject} onOpenInNew={this.handleOpenInNew} />
            </Menu>
          </div>
          <div className={classes.grow}>
            <Switch>
              <Route path="/projects/:projectId/board" component={Filters} />
              <Route component={this.nullComponent} />
            </Switch>
          </div>
          <div>
            <RightMenu />
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

  private handleClose = (element: string) => () => {
    this.setState({ [element]: null });
  };

  private selectProject = (project: Project) => async () => {
    const projectId = project.id as number;
    const { selectedProject, startUserWork, push } = this.props;
    this.clearTimeout();
    this.setState({ anchorEl: null, expanded: false });
    if (selectedProject && selectedProject.id !== projectId) {
      this.props.showWarning({
        action: {
          callback: async () => {
            await startUserWork({
              projectId,
            });
            this.props.showWarning({
              action: {
                callback: this.props.openTaskModal,
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
  };

  private handleOpenInNew = (project: Project) => async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { selectedProject, startUserWork, push } = this.props;
    this.clearTimeout();
    this.setState({ anchorEl: null, expanded: false });
    if (!selectedProject || selectedProject.id !== project.id) {
      const taskTitle = 'Обзор';
      this.props.showWarning({
        action: {
          // callback: this.props.openTaskModal,
          callback: async () => {
            await startUserWork({
              projectId: project.id as number,
              title: taskTitle,
            });
            push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);
            this.props.showWarning({
              action: {
                callback: this.props.openTaskModal,
                label: 'Редактировать',
              },
              message: `Редактировать задачу "${taskTitle}"?`,
              title: `Задача для проекта "${project.title}" успешно создана!`,
            });
          },
          label: 'Создать и перейти',
        },
        message: `Для него будет создана задача "${taskTitle}"`,
        title: `Вы собираетесь перейти к проекту "${project.title}"`,
      });
    } else {
      push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);
    }
  };

  private nullComponent() {
    return null;
  }
}
