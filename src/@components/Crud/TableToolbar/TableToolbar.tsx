import React from 'react';

import cn from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
  create: {
    marginLeft: theme.spacing(2),
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    alignItems: 'center',
    flex: '1 1 100%',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
}));

interface TableToolbarProps {
  numSelected: number;
  entityName: string;
  createItem: any;
  deleteBulk?: any;
}

export const TableToolbarTsx: React.FC<TableToolbarProps> = ({ numSelected, entityName, createItem, deleteBulk }) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={cn(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} выбрано
        </Typography>
      ) : (
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            {entityName}
          </Typography>
          {createItem && (
            <Button className={classes.create} variant="outlined" color="primary" onClick={createItem}>
              Создать
            </Button>
          )}
        </div>
      )}
      {numSelected > 0 && Boolean(deleteBulk) ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteBulk}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
