import React, { useCallback, useMemo } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { ACCESS_LEVEL } from '@types';

function filterEnum(t: any) {
  return isNaN(parseInt(t, 0));
}

const COLOR = {
  [ACCESS_LEVEL.WHITE]: 'white',
  [ACCESS_LEVEL.RED]: 'red',
  [ACCESS_LEVEL.ORANGE]: 'orange',
  [ACCESS_LEVEL.YELLOW]: 'yellow',
  [ACCESS_LEVEL.GREEN]: 'green',
  [ACCESS_LEVEL.BLUE]: 'blue',
  [ACCESS_LEVEL.INDIGO]: 'indigo',
  [ACCESS_LEVEL.VIOLET]: 'violet',
};

export const ColoredSelect: React.FC<any> = ({ allowed, editable, name, onChange, value }) => {
  const editableItems = useMemo<any[]>(() => {
    return allowed ? Object.keys(allowed).filter(filterEnum) : [];
  }, [allowed]);

  const renderValue = useCallback(
    (s: unknown) =>
      allowed ? <span style={{ backgroundColor: COLOR[s as string] }}>{allowed[s as string]}</span> : undefined,
    [allowed]
  );

  const handleCloseSelect = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  const labelValue = useMemo(() => allowed && allowed[value], [allowed, value]);

  if (!editable) {
    return <span>{labelValue}</span>;
  }

  return (
    <Select name={name} onChange={onChange} onClose={handleCloseSelect} renderValue={renderValue} value={value}>
      {editableItems.map(key => {
        const curValue = allowed[key];
        const selected = value === curValue;
        return (
          <MenuItem selected={selected} key={curValue} value={curValue} style={{ backgroundColor: COLOR[curValue] }}>
            <ListItemText primary={key} />
          </MenuItem>
        );
      })}
    </Select>
  );
};
