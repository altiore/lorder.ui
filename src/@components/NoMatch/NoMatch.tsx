import React from 'react';
import { RouteComponentProps } from 'react-router';

import notFoundImg from './img/404.png';

export interface INoMatchProps {
  classes: any;
}

export const NoMatchTsx = ({ classes, location }: RouteComponentProps<{}> & INoMatchProps) => (
  <div className={classes.root}>
    <div className={classes.above}>
      <img alt="No Match" src={notFoundImg} className={classes.img} />
      <div className={classes.location}>{location.pathname}</div>
    </div>
    <div className={classes.grow} />
  </div>
);
