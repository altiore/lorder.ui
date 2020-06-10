import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import get from 'lodash/get';

import { AppBar, Grid, IconButton, Paper, Tab, Tabs, Toolbar, Typography } from '@material-ui/core/';

import TelegramIco from '@components/@icons/Telegram';
import { Block } from '@components/Block';
import HeaderFixed from '@components/HeaderFixed';
import LoadingPage from '@components/LoadingPage';
import { NoMatch } from '@components/NoMatch';
import Person from '@components/Person';

import PieChart from '#/@common/PieChart';
import { millisecondsToHours } from '#/@store/@common/helpers';
import { Member } from '#/@store/projects/members/Member';

import FollowProject from './FollowProject';
import ProjectMetrics from './Metrics';
import ProjectHead from './ProjectHead';
import ProjectTeam from './ProjectTeam';
import ProjectValues from './ProjectValues';
import { StatisticTablesTsx } from './StatisticsTables/StatisticsTables';
import { useStyles } from './styles';

import { IProject } from '@types';

export interface IPublicProjectProps extends RouteComponentProps<{ projectId: string }> {
  isAuth: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  fetchPublicProject: any;
  project: IProject;
  publicProjectUuid: string;
  statistic: any;
  team: Array<{
    image: string;
    name: string;
  }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export const PublicProjectTsx: React.FC<IPublicProjectProps> = ({
  fetchPublicProject,
  isAuth,
  isLoaded,
  isLoading,
  location,
  match,
  project,
  publicProjectUuid,
  statistic,
}) => {
  const [value, setValue] = React.useState(0);

  const matchProjectUuid = useMemo(() => {
    return match.params.projectId;
  }, [match]);

  const members: Member[] = useMemo(() => {
    return (project && project.members ? project.members : []) as Member[];
  }, [project]);

  useEffect(() => {
    if (publicProjectUuid !== matchProjectUuid) {
      console.log('fetch public project info');
      fetchPublicProject(matchProjectUuid);
    }
  }, [fetchPublicProject, matchProjectUuid, publicProjectUuid]);

  const classes = useStyles();

  const chartData = useMemo(() => {
    return members.map(el => ({
      name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
      y: millisecondsToHours(el.timeSum) || 0.01,
    }));
  }, [members]);

  const chartValueData = useMemo(() => {
    return members.map(el => ({
      name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
      y: el.valueSum || 0.1,
    }));
  }, [members]);

  const handleChange = useCallback((_, newValue: number) => {
    setValue(newValue);
  }, []);

  const handleChangeIndex = useCallback((index: number) => {
    setValue(index);
  }, []);

  if (isLoading || !isLoaded || !chartData || !chartValueData) {
    return <LoadingPage />;
  }
  if (!project.title) {
    return <NoMatch location={location} />;
  }

  return (
    <div className={classes.root}>
      <HeaderFixed brandName="Lorder" brandLink="/" />

      <ProjectHead project={project} editProjectLink={`/projects/${project.id}/settings`} isAuth={isAuth} />
      <ProjectMetrics statistic={statistic} />
      <FollowProject project={project} />
      <Paper square variant="outlined" className={classes.sectionWrap}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Таблицы" />
          <Tab label="Диаграммы" />
        </Tabs>
        <SwipeableViews axis={'x-reverse'} index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            <StatisticTablesTsx timeStatistic={chartData} worthPoints={chartValueData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container className={classes.content}>
              <Block>
                <Grid item lg={6} md={12} sm={12}>
                  <PieChart key={1} data={chartData} title="Статистика по времени" unit="h" />
                </Grid>
                <Grid item lg={6} md={12} sm={12}>
                  <PieChart key={2} data={chartValueData} title="Статистика по ценности" />
                </Grid>
              </Block>
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </Paper>
      <ProjectValues />
      <ProjectTeam />
      <Grid container className={classes.content}>
        <Block spacing={10}>
          <div className={classes.members}>
            {members.map(member => (
              <Grid item key={member.member.email}>
                <Person
                  avatar={get(member, 'member.avatar.url', '')}
                  name={get(member.member, 'displayName') || get(member.member, 'email', '').replace(/@.*$/, '')}
                />
              </Grid>
            ))}
          </div>
        </Block>
      </Grid>
      <AppBar key={'bottom'} position="static" component={'footer'}>
        <Toolbar className={classes.bottomBar}>
          <Typography variant="h6" color="inherit">
            Copyright &copy; Lorder
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" href={'https://t.me/joinchat/BmXj_kK5vnoAWdQF7tTc1g'} target={'_blank'}>
              <TelegramIco />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
