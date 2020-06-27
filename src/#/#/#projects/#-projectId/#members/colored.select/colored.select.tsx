import React, { useCallback, useMemo } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { darken, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { palette } from '@styles/themes/light/palette';

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
    <Typography
      style={{
        backgroundColor: palette.access[accessLevel].light,
        color: palette.access[accessLevel].contrastText,
      }}
      className={root}
    >
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
    color: palette.access[0].contrastText,
  },
  1: {
    '&:hover': {
      backgroundColor: darken(palette.access[1].light, 0.2),
    },
    backgroundColor: palette.access[1].light,
    color: palette.access[1].contrastText,
  },
  2: {
    '&:hover': {
      backgroundColor: darken(palette.access[2].light, 0.2),
    },
    backgroundColor: palette.access[2].light,
    color: palette.access[2].contrastText,
  },
  3: {
    '&:hover': {
      backgroundColor: darken(palette.access[3].light, 0.2),
    },
    backgroundColor: palette.access[3].light,
    color: palette.access[3].contrastText,
  },
  4: {
    '&:hover': {
      backgroundColor: darken(palette.access[4].light, 0.2),
    },
    backgroundColor: palette.access[4].light,
    color: palette.access[4].contrastText,
  },
  5: {
    '&:hover': {
      backgroundColor: darken(palette.access[5].light, 0.2),
    },
    backgroundColor: palette.access[5].light,
    color: palette.access[5].contrastText,
  },
  6: {
    '&:hover': {
      backgroundColor: darken(palette.access[6].light, 0.2),
    },
    backgroundColor: palette.access[6].light,
    color: palette.access[6].contrastText,
  },
  7: {
    '&:hover': {
      backgroundColor: darken(palette.access[7].light, 0.2),
    },
    backgroundColor: palette.access[7].light,
    color: palette.access[7].contrastText,
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
