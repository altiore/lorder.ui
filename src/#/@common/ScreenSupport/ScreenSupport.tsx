import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
<<<<<<< HEAD:src/#/@common/ScreenSupport/ScreenSupport.tsx

=======
>>>>>>> 4da359d... AL-751: added support page:src/#/@common/ScreenSupport/ScreenSupport.tsx
import Block from '#/#hi/#/@common/Block';
import ScreenTitle from '#/#hi/#/@common/ScreenTitle';

import SubscribeForm from './SubscribeForm';
import SupportForm from './SupportForm';

interface ScreenSupportI {
  name: string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  block: {
    '& > div': {
      backgroundColor: theme.palette.primary.main,
      minHeight: theme.spacing(34),
      padding: theme.spacing(2),
    },
    alignItems: 'justify',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    padding: theme.spacing(6, 2),
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 136px)',
    overflow: 'hidden',
    position: 'relative',
  },
}));

export const ScreenSupport: React.FC<ScreenSupportI> = ({ name }) => {
  const { block, content } = useStyles();

  return (
    <Block name={name} className={content} spacing={3}>
      <ScreenTitle black>Поддержать проект</ScreenTitle>
      <Grid item md={1} xs={false} />
      <Grid className={block} item md={5} xs={12}>
        <SupportForm />
      </Grid>
      <Grid className={block} item md={5} xs={12}>
        <SubscribeForm />
      </Grid>
      <Grid item md={1} xs={false} />
    </Block>
  );
};
