import React, { useCallback, useMemo } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function filterEnum(t: any) {
  return isNaN(parseInt(t, 0));
}

export const SelectCell: React.FC<any> = ({ allowed, editable, name, onChange, value }) => {
  const editableItems = useMemo<any[]>(() => {
    return allowed ? Object.keys(allowed).filter(filterEnum) : [];
  }, [allowed]);

  const renderValue = useCallback((s: unknown) => (allowed ? allowed[s as string] : undefined), [allowed]);

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
        const selected = value === allowed[key];
        return (
          <MenuItem selected={selected} key={allowed[key]} value={allowed[key]}>
            <ListItemText primary={key} />
          </MenuItem>
        );
      })}
    </Select>
  );
};
