import React, { useRef } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ACCESS_LEVEL } from '@store/projects';

export interface ISelectProps {
  items: Array<{
    label: string;
    value: ACCESS_LEVEL;
  }>;
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

export const SelectTsx: React.FC<ISelectProps> = ({ items, value, onChange }) => {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth((inputLabel as any).current.offsetWidth);
  }, []);

  const handleChange = event => {
    onChange(event.target.value);
  };

  const PreparedSelect: any = Select;

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Уровень доступа
      </InputLabel>
      <PreparedSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </PreparedSelect>
    </FormControl>
  );
};
