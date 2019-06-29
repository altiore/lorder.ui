import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import {LinkButton} from "@domains/@common/LinkButton";
import Block from "@domains/@Hi/@common/Block";
import MainClockIco from "./MainClock";
import {useStyles} from "./styles";

interface Screen1I {
  btnText2?: string;
  text2?: string;
}

const Screen1: React.FC<Screen1I> = ({btnText2, text2}) => {
  const classes = useStyles();

  return (
    <Block className={classes.content} direction="row-reverse">
      <Grid item md={1} xs={false} />
      <Grid item className={classes.block} md={5} xs={12}>
        <MainClockIco />
      </Grid>
      <Grid item className={classes.block} md={5} xs={12}>
        <Typography className={classes.question} variant='h4'>
          А ты управляешь своим временем?
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.motto} variant='h5'>
          <span className={classes.title}>ALTIORE</span> - From people to generations
        </Typography>
        <LinkButton
          variant='outlined'
          color='secondary'
          className={classes.button}
          to={'/login'}
        >
          Управлять временем
        </LinkButton>
      </Grid>
      <Grid item md={1} xs={false} />
    </Block>
  );
};

export default Screen1;