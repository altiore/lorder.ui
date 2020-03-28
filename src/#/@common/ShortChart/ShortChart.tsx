import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Project } from '#/@store/projects';

import { useStyles } from './styles';

export interface IShortChartProps {
  dense?: boolean;
  project?: Partial<Project> & { percent: string | number; time: string };
}

export const ShortChartTsx: React.FunctionComponent<IShortChartProps> = ({ dense, project }) => {
  const classes = useStyles();

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
