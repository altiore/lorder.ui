import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import debounce from 'lodash-es/debounce';
import * as React from 'react';

import { TelegramIco } from 'src/components/@icons/Telegram';
import { Block } from 'src/components/Block';
import { MemberCard } from 'src/components/MemberCard';
import { LinkButton } from 'src/domains/@common/LinkButton';
import { BackGroundVideo } from './BackGroundVideo';
import { Title } from './Title';

export interface IInfoProps {
  brandName: string;
  classes: any;
  team: Array<{
    image: string;
    name: string;
  }>;
  tours: Array<{
    duration: number;
    image: string;
    stars: number;
    reviews: number;
    title: string;
  }>;
}

export interface IState {
  height: number;
  width: number;
}

export class InfoTsx extends React.Component<IInfoProps, IState> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      ...this.getDimensions(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.handleResize, 200), false);
  }

  render() {
    const { brandName, classes, team } = this.props;
    const { height, width } = this.state;
    return (
      <div className={classes.root}>
        <BackGroundVideo height={height} width={width} />

        <AppBar key={'top'} position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {brandName}
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.overlay} style={{ height: height - 64, width: width - 15 }}>
          <Title />
        </div>

        <Grid container className={classes.content}>
          <Block>
            <Grid item className={classes.profile}>
              <Typography variant={'h4'}>Пока ты думаешь, время уходит... безвозвратно...</Typography>
              <LinkButton variant={'contained'} color={'primary'} className={classes.button} to={'/login'}>
                Начать управлять своим временем эффективно!
              </LinkButton>
            </Grid>
          </Block>

          <Divider />
          <Block>
            <Grid item className={classes.profile} xs={12}>
              <Typography variant={'h4'}>Наша комманда</Typography>
              <Typography>В безумном мире хаоса мы помогаем тебе навести порядок... И себе...</Typography>
            </Grid>
            {team.map((member, index) => (
              <Grid item key={index}>
                <MemberCard {...member} />
              </Grid>
            ))}
          </Block>
        </Grid>

        <AppBar key={'bottom'} position="static" component={'footer'}>
          <Toolbar className={classes.bottomBar}>
            <Typography variant="h6" color="inherit">
              Copyright &copy; {brandName}
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

  private handleResize() {
    this.setState(this.getDimensions());
  }

  private getDimensions() {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || (e && e.clientWidth) || g.clientWidth;
    const height = w.innerHeight || (e && e.clientHeight) || g.clientHeight;
    return {
      height,
      width,
    };
  }
}
