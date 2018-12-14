import * as React from 'react';

export interface ILastEventsProps {
  classes?: any;
}

export const LastEventsTsx: React.FunctionComponent<ILastEventsProps> = ({ classes }) => (
  <div className={classes.list}>Здесь будут отображаться последние действия</div>
);
