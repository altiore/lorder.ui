import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TelegramIco from '@components/@icons/Telegram';
import YouTubeVideo from '@components/YouTubeVideo';

import HiHeader from './HiHeader';
import ScreenAdvantages from './ScreenAdvantages';
import ScreenHelp from './ScreenHelp';
import ScreenProgress from './ScreenProgress';
import ScreenServices from './ScreenServices';
import ScreenStart from './ScreenStart';
import ScreenSupport from './ScreenSupport';
import ScreenTeam from './ScreenTeam';

export interface IHiProps {
  brandName: string;
  classes: any;
  fetchAltiore: () => any;
  fetchStatistics: () => any;
  height: number;
  scrollWidth: number;
  width: number;
}

const BLOCKS = {
  start: {
    menu: true,
    name: 'start',
    title: 'homepage.navigation.start',
  },

  help: {
    menu: true,
    name: 'help',
    title: 'homepage.navigation.help',
  },

  services: {
    name: 'services',
    title: 'Услуги',
  },

  advantages: {
    name: 'advantages',
    title: 'Преимущества',
  },

  progress: {
    name: 'progress',
    title: 'Достижения',
  },

  team: {
    menu: true,
    name: 'team',
    title: 'homepage.navigation.team',
  },

  support: {
    menu: true,
    name: 'support',
    title: 'homepage.navigation.support',
  },
};

export const HiTsx: React.FC<IHiProps> = ({
  brandName,
  classes,
  fetchAltiore,
  fetchStatistics,
  height,
  scrollWidth,
  width,
}) => {
  useEffect(() => {
    fetchStatistics();
    fetchAltiore();
  }, [fetchAltiore, fetchStatistics]);

  const theme = useTheme();
  const isDesctop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container direction="column" className={classes.root}>
      <Helmet>
        <body className={classes.hiBody} />
      </Helmet>
      {isDesctop ? (
        <YouTubeVideo
          videoId="PT8urv0CtUw"
          opts={{ start: 14, end: 280 }}
          height={height}
          scrollWidth={scrollWidth}
          width={width}
        />
      ) : null}

      <HiHeader blocks={BLOCKS} />

      <ScreenStart name={BLOCKS.start.name} />

      <ScreenHelp name={BLOCKS.help.name} />

      <ScreenServices name={BLOCKS.services.name} />

      <ScreenAdvantages name={BLOCKS.advantages.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenTeam name={BLOCKS.team.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenSupport name={BLOCKS.support.name} />

      <AppBar key={'bottom'} position="static" component={'footer'}>
        <Toolbar className={classes.bottomBar}>
          <Typography variant="h5" color="inherit">
            Copyright &copy; {brandName}
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" href="https://t.me/razzwan_altiore" target="_blank">
              <TelegramIco />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
