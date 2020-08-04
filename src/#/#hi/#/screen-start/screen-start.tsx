import React, { useCallback, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Block from '#/#hi/#/@common/block';
import { LinkButton } from '#/@common/link-button';

import ActiveClock from './active-clock';
import { useStyles } from './styles';

interface ScreenStartI {
  name: string;
}

const ScreenStart: React.FC<ScreenStartI> = ({ name }) => {
  const classes = useStyles();

  const [counter, setCounter] = useState(1);

  const [slowTimeSpeed, setSlowTimeSpeed] = useState(0);

  const startSlowSpeed = useCallback(() => {
    setCounter(state => state + 1);
    setSlowTimeSpeed(counter);
  }, [counter, setSlowTimeSpeed]);

  const stopSlowSpeed = useCallback(() => {
    setSlowTimeSpeed(0);
  }, [setSlowTimeSpeed]);

  const toggleSpeed = useCallback(() => {
    if (slowTimeSpeed === 0) {
      startSlowSpeed();
    } else {
      stopSlowSpeed();
    }
  }, [slowTimeSpeed, startSlowSpeed, stopSlowSpeed]);

  return (
    <Block name={name} className={classes.content} direction="row-reverse">
      <Grid item md={1} xs={false} />
      <Grid item className={classes.block} md={5} xs={12} onClick={toggleSpeed}>
        <ActiveClock slowTimeSpeed={slowTimeSpeed} />
      </Grid>
      <Grid item className={classes.block} md={5} xs={12}>
        <Typography className={classes.question} variant="h1">
          А ты управляешь
          <br /> своим временем?
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.motto} variant="h4">
          <span className={classes.title}>LORDER</span> - is a <b>L</b>ife <b>Order</b>
        </Typography>
        <LinkButton
          onMouseOver={startSlowSpeed}
          onMouseLeave={stopSlowSpeed}
          variant="outlined"
          color="secondary"
          className={classes.button}
          to={'/login'}
          id="main-big-btn"
        >
          Начать
        </LinkButton>
      </Grid>
      <Grid item md={1} xs={false} />
    </Block>
  );
};

export default ScreenStart;
