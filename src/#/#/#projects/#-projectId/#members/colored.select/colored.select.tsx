import React, { useCallback, useMemo } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { darken, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ACCESS_LEVEL } from '@types';

function filterEnum(t: any) {
  return isNaN(parseInt(t, 0));
}

const COLOR_TITLE = {
  [ACCESS_LEVEL.WHITE]: 'Белый',
  [ACCESS_LEVEL.RED]: 'Красный',
  [ACCESS_LEVEL.ORANGE]: 'Оранжевый',
  [ACCESS_LEVEL.YELLOW]: 'Желтый',
  [ACCESS_LEVEL.GREEN]: 'Зеленый',
  [ACCESS_LEVEL.BLUE]: 'Голубой',
  [ACCESS_LEVEL.INDIGO]: 'Синий',
  [ACCESS_LEVEL.VIOLET]: 'Фиолетовый',
};

const COLOR_BACK = {
  [ACCESS_LEVEL.WHITE]: '#fff',
  [ACCESS_LEVEL.RED]: '#f0aa9d',
  [ACCESS_LEVEL.ORANGE]: '#ffcd7f',
  [ACCESS_LEVEL.YELLOW]: '#ffe87f',
  [ACCESS_LEVEL.GREEN]: '#c0e6c9',
  [ACCESS_LEVEL.BLUE]: '#c3e3fd',
  [ACCESS_LEVEL.INDIGO]: '#94a5fd',
  [ACCESS_LEVEL.VIOLET]: '#c7b8f1',
};

const COLOR_FONT = {
  [ACCESS_LEVEL.WHITE]: '#292929',
  [ACCESS_LEVEL.RED]: '#6a1e10',
  [ACCESS_LEVEL.ORANGE]: '#7b3d0e',
  [ACCESS_LEVEL.YELLOW]: '#7b3d0e',
  [ACCESS_LEVEL.GREEN]: '#0f551f',
  [ACCESS_LEVEL.BLUE]: '#1a5c93',
  [ACCESS_LEVEL.INDIGO]: '#031fae',
  [ACCESS_LEVEL.VIOLET]: '#4f145f',
};

const useColorItemStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    height: theme.spacing(4.5),
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    width: theme.spacing(15),
  },
}));

const ColoredItem = ({ accessLevel }) => {
  const { root } = useColorItemStyles();
  return (
    <Typography style={{ backgroundColor: COLOR_BACK[accessLevel], color: COLOR_FONT[accessLevel] }} className={root}>
      {COLOR_TITLE[accessLevel] || 'N/A'}
    </Typography>
  );
};

const useSelectStyles = makeStyles((theme: Theme) => ({
  0: {
    '&:hover': {
      backgroundColor: '#dddddd',
    },
    backgroundColor: '#fff',
    color: COLOR_FONT[0],
  },
  1: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[1], 0.2),
    },
    backgroundColor: COLOR_BACK[1],
    color: COLOR_FONT[1],
  },
  2: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[2], 0.2),
    },
    backgroundColor: COLOR_BACK[2],
    color: COLOR_FONT[2],
  },
  3: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[3], 0.2),
    },
    backgroundColor: COLOR_BACK[3],
    color: COLOR_FONT[3],
  },
  4: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[4], 0.2),
    },
    backgroundColor: COLOR_BACK[4],
    color: COLOR_FONT[4],
  },
  5: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[5], 0.2),
    },
    backgroundColor: COLOR_BACK[5],
    color: COLOR_FONT[5],
  },
  6: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[6], 0.2),
    },
    backgroundColor: COLOR_BACK[6],
    color: COLOR_FONT[6],
  },
  7: {
    '&:hover': {
      backgroundColor: darken(COLOR_BACK[7], 0.2),
    },
    backgroundColor: COLOR_BACK[7],
    color: COLOR_FONT[7],
  },
  select: {
    paddingLeft: 0,
    paddingTop: 0,
  },
}));

export const ColoredSelect: React.FC<any> = ({ allowed, editable, name, onChange, value }) => {
  const classes = useSelectStyles();

  const editableItems = useMemo<any[]>(() => {
    return allowed ? Object.keys(allowed).filter(filterEnum) : [];
  }, [allowed]);

  const renderValue = useCallback((s: unknown) => (allowed ? <ColoredItem accessLevel={s} /> : undefined), [allowed]);

  const handleCloseSelect = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  if (!editable) {
    return <ColoredItem accessLevel={value} />;
  }

  return (
    <Select
      classes={{ root: classes.select }}
      name={name}
      onChange={onChange}
      onClose={handleCloseSelect}
      renderValue={renderValue}
      value={value}
    >
      {editableItems.map(key => {
        const curValue = allowed[key];
        const selected = value === curValue;
        return (
          <MenuItem classes={{ root: classes[curValue || 0] }} selected={selected} key={curValue} value={curValue}>
            <ListItemText primary={COLOR_TITLE[curValue]} />
          </MenuItem>
        );
      })}
    </Select>
  );
};
