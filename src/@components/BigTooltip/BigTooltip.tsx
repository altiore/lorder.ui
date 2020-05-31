import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    opacity: 1,
  },
  tooltip: {
    boxShadow: theme.shadows[4],
    fontSize: '14px',
    marginBottom: 8,
    padding: 8,
  },
}));

export const BigTooltipTsx: React.FC<TooltipProps> = props => {
  const classes = useStyles();

  return <Tooltip classes={classes} arrow {...props} />;
};
