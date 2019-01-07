import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import PieChartIcon from '@material-ui/icons/PieChart';
// import TodayIcon from '@material-ui/icons/Today';
import * as React from 'react';

import { Project } from 'src/store/projects';

export interface IShortChartProps {
  classes?: any;
  dense?: boolean;
  project?: Partial<Project & { percent: string | number; time: string }>;
}

export const ShortChartTsx: React.FunctionComponent<IShortChartProps> = ({ classes, dense, project }) => {
  if (!project) {
    return null;
  }
  const { percent, time } = project;
  return (
    <List className={classes.list} dense={dense}>
      <ListItem>
        <ListItemText primary={`${time}`} secondary={`(${percent}%)`} />
      </ListItem>
    </List>
  );
};
