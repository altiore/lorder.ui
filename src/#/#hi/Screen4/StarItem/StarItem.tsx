import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import React from 'react';

import { useStyles } from './styles';

interface ItemI {
  children: any;
}

const StarItem: React.FC<ItemI> = ({ children }) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" button>
      <ListItemIcon>
        <StarIcon className={classes.star} />
      </ListItemIcon>
      <ListItemText primary={<Typography>{children}</Typography>} />
    </ListItem>
  );
};

export default StarItem;
