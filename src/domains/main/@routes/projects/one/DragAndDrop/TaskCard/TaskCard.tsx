import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { ProjectTask } from 'src/store/projects';

export interface ITaskCard extends Partial<ProjectTask> {
  classes: any;
}

export const TaskCardTsx: React.FunctionComponent<ITaskCard> = ({ classes, title, value }) => {
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography component="p">{value}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
