import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { Page } from 'src/domains/@common/Page';
import { Project } from 'src/store/projects';
import { ProjectTaskTypes } from './ProjectTaskTypes';
import { ProjectUsers } from './ProjectUsers';

export interface IProjectProps {
  classes: any;
  closeDialog: any;
  fetchProjectDetails: any;
  openDialog: any;
  project: Project;
  theme: any;
}

export class ProjectJsx extends React.Component<RouteComponentProps<{}> & IProjectProps, { value: number }> {
  public state = {
    value: 0,
  };

  public componentDidMount() {
    this.props.fetchProjectDetails(this.props.project.id);
  }

  public handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  public handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  public render() {
    const { classes, project, theme } = this.props;
    if (!project) {
      return null;
    }
    return (
      <Page>
        <h3>{project.title}</h3>
        <div className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Типы задач" />
            <Tab label="Пользователи" />
            <Tab label="Другие настройки" />
          </Tabs>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <ProjectTaskTypes />
            <ProjectUsers />
            <p>Item Three</p>
          </SwipeableViews>
        </div>
      </Page>
    );
  }
}
