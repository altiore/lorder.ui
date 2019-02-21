import * as React from 'react';

export interface IPostFeedbackProps {
  classes: any;
}

export const PostFeedbackTsx: React.FunctionComponent<IPostFeedbackProps> = ({ classes }) => (
  <div className={classes.root}>test test test</div>
);
