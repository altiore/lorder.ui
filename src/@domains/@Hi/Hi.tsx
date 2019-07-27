import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import { TelegramIco } from '@components/@icons/Telegram';
import YouTubeVideo from '@components/YouTubeVideo';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen5 from './Screen5';

export interface IHiProps {
  brandName: string;
  classes: any;
  fetchAltiore: () => any;
  height: number;
  scrollWidth: number;
  width: number;
}

export const HiTsx: React.FC<IHiProps> = ({ brandName, classes, fetchAltiore, height, scrollWidth, width }) => {
  useEffect(() => {
    fetchAltiore();
  }, [fetchAltiore]);

  return (
    <Grid container direction="column">
      <YouTubeVideo
        videoId="PT8urv0CtUw"
        opts={{ start: 14, end: 280 }}
        height={height}
        scrollWidth={scrollWidth}
        width={width}
      />

      <AppBar key={'top'} position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {brandName}
          </Typography>
        </Toolbar>
      </AppBar>

      <Screen1 />

      <Screen2 />

      <Screen3 />

      <Screen4 />

      <Screen5 />

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
    </Grid>
  );
};
