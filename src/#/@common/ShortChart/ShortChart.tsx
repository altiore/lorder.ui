import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Project } from '#/@store/projects';

import { useStyles } from './styles';

export interface IShortChartProps {
  dense?: boolean;
  project?: Project;
}

export const ShortChartTsx: React.FunctionComponent<IShortChartProps> = ({ dense, project }) => {
  const classes = useStyles();

  if (!project) {
    return null;
  }

  return (
    <List className={classes.list} dense={dense}>
      <ListItem>
        <ListItemText primary={`0`} secondary={`(0%)`} />
      </ListItem>
    </List>
  );
};
