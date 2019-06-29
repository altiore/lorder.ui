import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useStyles } from './styles';

interface ItemI {
  children: any;
}

const Item: React.FC<ItemI> = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.item}>
      <Typography>{children}</Typography>
    </Paper>
  );
};

export default Item;
