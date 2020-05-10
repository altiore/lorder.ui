// Этот шаблон нигде не используется, я его оставил из-за возникших вопросов
import React from 'react';
import { Helmet } from 'react-helmet';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TelegramIco from '@components/@icons/Telegram';

import HiHeader from './HiHeader';
// import { ROLES } from '#/@store/roles';
// import { IRoute } from '@types';


export interface IHiProps {
  brandName: string;
  classes: any;
}

const BLOCKS = {
  start: {
    menu: true,
    name: 'start',
    title: 'Начать',
  },

  help: {
    menu: true,
    name: 'help',
    title: 'Что это?',
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
    title: 'Наша Команда',
  },

  support: {
    menu: true,
    name: 'support',
    title: 'Поддержать проект',
  },
};

/**
 * TODO не понял как правильно организовать роуты
 * при таком подходе, support доступна только по адресу /hi/support
 * а нам надо чтобы боыло /support
 */
// export const APP_MAIN_ROUTES: IRoute[] = [
//   {
//     access: [ROLES.ALL],
//     component: lazy(() => import('./#support')),
//     path: '/support',
//   }
// ];

// были затыки с пониманием... где передаются пропсы
export const HiTsx: React.FC<IHiProps> = ({
  brandName,
  classes
}) => {
  // TODO если это общий шаблон, для данного контекста
  // то по идее, мне надо проверять на какой странице мы сейчас 
  // находимся и исходя из этого надо подгуржать необходимые компоненты
  return (
    <Grid container direction="column" className={classes.root}>
      <Helmet>
        <body className={classes.hiBody} />
      </Helmet>

      <HiHeader blocks={BLOCKS} />

      {/* Подгружать вот сюда, но.... да, опятьже этот подход не верный! */}

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
