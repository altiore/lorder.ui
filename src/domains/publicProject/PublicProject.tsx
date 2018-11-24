import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { TelegramIco } from 'src/components/@icons/Telegram';
import { Block } from 'src/components/Block';
import { MemberCard } from 'src/components/MemberCard';
import { PieChart } from 'src/components/PieChart';
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
      publicProjectData: { isLoading, isLoaded, title, statistic, chartData, projectId },
      classes,
      isAuth,
    } = this.props;
    if (isLoading && !isLoaded) {
      return '...loading';
    }
    if (!title) {
      return 'Not Found';
    }
    return (
      <div className={classes.root}>
        {!isAuth && (
          <AppBar key={'top'} position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Altiore
              </Typography>
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

          {statistic && (
            <>
              <Divider />
              <PieChart data={chartData} title="Статистика по проекту" />
            </>
          )}

          <Divider />
          <Block>
            <Grid item className={classes.profile} xs={12}>
              <Typography variant={'h4'}>Комманда проекта</Typography>
              <Typography>Мы дарим людям мир и красоту, но только если это будет добром!</Typography>
            </Grid>
            {statistic &&
              Object.keys(statistic.members).map((member, index) => (
                <Grid item key={index}>
                  <MemberCard avatar={statistic.members[member].avatar} name={statistic.members[member].email} />
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
