import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PieChartIcon from '@material-ui/icons/PieChart';
import TodayIcon from '@material-ui/icons/Today';
import React from 'react';

export interface IShortChartProps {
  classes?: any;
  id?: number;
  time: string;
  title: string;
  percent: string;
}

export const ShortChartTsx: React.StatelessComponent<IShortChartProps> = ({ classes, id, title, percent, time }) => (
  <List className={classes.list}>
    <ListItem>
      <ListItemIcon>
        <PieChartIcon />
      </ListItemIcon>
      <ListItemText primary={`Доля в проекте - 11%`} secondary={'(по времени - 18%)'} />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary={`Сегодня`} secondary={`${time} (${percent}%)`} />
    </ListItem>
  </List>
);
