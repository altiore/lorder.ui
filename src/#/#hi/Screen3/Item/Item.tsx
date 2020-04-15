import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    backgroundColor: theme.palette.primary.light,
    backgroundImage: 'linear-gradient(90deg, #29292b 0%, #2d2d30 20%, #424247 50%, #2d2d30 80%,' + ' #29292b 100%)',
    // boxShadow: theme.shadows[5],
    boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.2), 0 5px 5px -5px rgba(0,0,0,0.12)',
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5, 5),
    textAlign: 'center',
  },
}));

interface ItemI {
  children: any;
}

const Item: React.FC<ItemI> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <Typography>{children}</Typography>
    </div>
  );
};

export default Item;
