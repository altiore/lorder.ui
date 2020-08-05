import React, { useCallback, useMemo } from 'react';

import invert from 'lodash/invert';

import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function filterEnum(t: any) {
  return isNaN(parseInt(t, 0));
}

const defSelected = [];

export const MultiSelectCell: React.FC<any> = ({ allowed, editable, name, onChange, value }) => {
  const editableItems = useMemo<any[]>(() => {
    return allowed ? Object.keys(allowed).filter(filterEnum) : [];
  }, [allowed]);

  const renderValue = useCallback(
    (s: unknown) => {
      return ((s as any) || defSelected).map(e => invert(allowed)[e as any]).join(', ');
    },
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
    <Select
      name={name}
      onChange={onChange}
      onClose={handleCloseSelect}
      renderValue={renderValue}
      value={value}
      multiple
    >
      {editableItems.map(key => {
        const selected = ((value as any) || []).includes(allowed[key]);
        return (
          <MenuItem selected={selected} key={allowed[key]} value={allowed[key]}>
            <Checkbox checked={selected} size="small" color="primary" />
            <ListItemText primary={key} />
          </MenuItem>
        );
      })}
    </Select>
  );
};
