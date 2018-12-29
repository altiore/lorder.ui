import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { TelegramIco } from 'src/components/@icons/Telegram';
import { Block } from 'src/components/Block';
import { LoadingPage } from 'src/components/LoadingPage';
import { MemberCard } from 'src/components/MemberCard';
import { NoMatch } from 'src/components/NoMatch';
import PieChart from 'src/domains/@common/PieChart';
import { PublicProject } from 'src/store/publicProject';
import { LinkButton } from '../@common/LinkButton';

export interface IPublicProjectProps extends RouteComponentProps<{ projectId: string }> {
  classes: any;
  isAuth: boolean;
  fetchPublicProject: any;
  publicProjectData: PublicProject;
  team: Array<{
    image: string;
    name: string;
  }>;
}

export interface IState {
  height: number;
  width: number;
}

export class PublicProjectTsx extends React.Component<IPublicProjectProps, IState> {
  componentDidMount() {
    this.props.fetchPublicProject(this.props.match.params.projectId);
  }

  componentDidUpdate(prevProps: IPublicProjectProps) {
    if (prevProps.match.params.projectId !== this.props.match.params.projectId) {
      this.props.fetchPublicProject(this.props.match.params.projectId);
    }
  }

  render() {
    const {
      publicProjectData: { isLoading, isLoaded, title, statistic, chartData, chartValueData, projectId },
      classes,
      isAuth,
    } = this.props;
    if (isLoading && !isLoaded) {
      return <LoadingPage />;
    }
    if (!title) {
      return (
        <NoMatch
          location={this.props.location}
          match={this.props.match}
          history={this.props.history}
          staticContext={this.props.staticContext}
        />
      );
    }
    return (
      <div className={classes.root}>
        {!isAuth && (
          <AppBar key={'top'} position="static" className={classes.appBar}>
            <Toolbar>
              <Link to="/">
                <Typography variant="h6" className={classes.title}>
                  Altiore
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        )}

        <Grid container className={classes.content}>
          <Block>
            <Grid item>
              <Typography variant={'h1'}>{title}</Typography>
            </Grid>
          </Block>
          <Block>
            <Grid item className={classes.profile}>
              {isAuth ? (
                <LinkButton
                  variant={'contained'}
                  color={'primary'}
                  className={classes.button}
                  to={`/projects/${projectId}`}
                >
                  Настройки проекта
                </LinkButton>
              ) : (
                <>
                  <Typography variant={'h4'}>Сделай несколько простых шагов - и присоеденись к сообществу</Typography>
                  <LinkButton variant={'contained'} color={'primary'} className={classes.button} to={'/login'}>
                    Подключиться к проекту!
                  </LinkButton>
                </>
              )}
            </Grid>
          </Block>

          <Divider />
          <Block>
            <Grid container justify="space-around" item xs={12}>
              <div className={classes.chart}>
                <PieChart key={1} data={chartData} title="Статистика по времени" unit="h" />
              </div>
              <div className={classes.chart}>
                <PieChart key={2} data={chartValueData} title="Статистика по ценности" />
              </div>
            </Grid>
          </Block>

          <Divider />
          <Block>
            <Grid item className={classes.profile} xs={12}>
              <Typography variant={'h4'}>Команда проекта</Typography>
              <Typography>Мы дарим людям мир и красоту, но только если это будет добром!</Typography>
            </Grid>
            {statistic &&
              Object.keys(statistic.members).map((member, index) => (
                <Grid item key={index}>
                  <MemberCard
                    avatar={statistic.members[member].avatar}
                    name={statistic.members[member].email.replace(/\@.*$/, '')}
                  />
                </Grid>
              ))}
          </Block>
        </Grid>

        <AppBar key={'bottom'} position="static" component={'footer'}>
          <Toolbar className={classes.bottomBar}>
            <Typography variant="h6" color="inherit">
              Copyright &copy; Altiore
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
  }
}
