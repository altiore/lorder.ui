import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ACCESS_LEVEL } from '#/@store/projects';

export interface ISelectProps {
  items: Array<{
    label: string;
    value: ACCESS_LEVEL;
  }>;
  memberId: number;
  onChange: any;
  value: ACCESS_LEVEL;
}
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectTsx: React.FC<ISelectProps> = ({ items, memberId, value, onChange }) => {
  const classes = useStyles();

  const handleChange = event => {
    onChange(event.target.value, memberId);
  };

  const PreparedSelect: any = Select;

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Уровень доступа</InputLabel>
      <PreparedSelect id="demo-simple-select-outlined" value={value} onChange={handleChange}>
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </PreparedSelect>
    </FormControl>
  );
};
