import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

import TelegramIco from '@components/@icons/Telegram';

import HiHeader from '#/#hi/@common/hi-header';

import ProjectsList from './projects-list';
import SearchSection from './search-section';
import { useStyles } from './styles';

export const PublicProjects = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <HiHeader hideSecond />
      <SearchSection />
      <ProjectsList />
      <AppBar key={'bottom'} position="fixed" component={'footer'} style={{ top: 'auto', bottom: 0 }}>
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
    </>
  );
};
