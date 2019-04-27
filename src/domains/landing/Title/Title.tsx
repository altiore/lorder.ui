import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { LinkButton } from 'domains/@common/LinkButton';

export interface ITitleProps {
  classes: any;
  title: string;
  btnText: string;
  onLeave?: any;
  onOver?: any;
}

export const TitleTsx: React.FunctionComponent<ITitleProps> = ({ btnText, classes, title, onOver, onLeave }) => (
  <Grid container className={classes.wrapper}>
    <Grid item className={classes.root2} xs={12} />
    <Grid item className={classes.root}>
      <Typography variant="h1" color="secondary" className={classes.title}>
        {title}
      </Typography>

      <LinkButton
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        to={'/login'}
        onMouseOver={onOver}
        onMouseLeave={onLeave}
      >
        {btnText}
      </LinkButton>
    </Grid>
    <Grid item className={classes.root2} xs={12} />
    <Grid item className={classes.root2} xs={12} />
  </Grid>
);
