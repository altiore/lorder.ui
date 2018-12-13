import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { Page } from 'src/components/Page';
import { ProjectMembers } from './ProjectMembers';
import { ProjectTasks } from './ProjectTasks';
import { ProjectTaskTypes } from './ProjectTaskTypes';
import { Settings } from './Settings';

export interface IProjectProps {
  classes: any;
  closeDialog: any;
  fetchProjectDetails: any;
  openDialog: any;
  projectId?: number;
  theme: any;
}

export class ProjectJsx extends React.Component<RouteComponentProps<{}> & IProjectProps, { value: number }> {
  state = {
    value: 0,
  };

  componentDidMount() {
    if (this.props.projectId) {
      this.props.fetchProjectDetails(this.props.projectId);
    }
  }

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  render() {
    const { classes, projectId, theme } = this.props;
    if (!projectId) {
      return null;
    }
    return (
      <Page>
        <div className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
          >
            <Tab label="Задачи" />
            <Tab label="Типы задач" />
            <Tab label="Пользователи" />
            <Tab label="Другие настройки" />
          </Tabs>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <ProjectTasks />
            <ProjectTaskTypes />
            <ProjectMembers />
            <Settings />
          </SwipeableViews>
        </div>
      </Page>
    );
  }
}
