import React, { useCallback, useMemo } from 'react';

import { WrappedFieldProps } from 'redux-form';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: 2,
    maxWidth: 200,
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  menuItem: {
    padding: theme.spacing(0, 1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const customMenuProps: Partial<MenuProps> = {
  autoFocus: false,
  disableAutoFocusItem: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const defGetId = el => el.id;
const defGetValue = el => (el ? el.title || el.name || el.value : '[N/A]');

export interface IMultiSelectField extends WrappedFieldProps {
  items: any[];
  label?: string;
  getId?: (el: any) => number | string;
  getVal?: (el: any) => number | string;
}

export const MultipleSelectField: React.FC<IMultiSelectField> = ({ input, items, label, getId, getVal }) => {
  const { chip, chips, formControl, menuItem } = useStyles();

  const onChange = useMemo(() => input.onChange, [input]);

  const inputValue = useMemo(() => input.value || [], [input]);

  const curGetId = useMemo(() => getId || defGetId, [getId]);

  const curGetValue = useMemo(() => getVal || defGetValue, [getVal]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      onChange(event.target.value as string[]);
    },
    [onChange]
  );

  const renderValue = useCallback(
    selected => (
      <div className={chips}>
        {(selected as string[]).map(value => {
          const curEl = items.find(el => curGetId(el) === value);
          return <Chip key={value} label={curGetValue(curEl)} className={chip} />;
        })}
      </div>
    ),
    [chip, chips, curGetId, curGetValue, items]
  );

  const id = input.name + 'Field';
  return (
    <FormControl fullWidth color="primary" className={formControl} size="small">
      <InputLabel id={id}>{label || input.name}</InputLabel>
      <Select
        autoWidth
        labelId={id}
        id={id + 'Select'}
        multiple
        value={inputValue}
        onChange={handleChange}
        input={<Input />}
        renderValue={renderValue}
        MenuProps={customMenuProps}
      >
        {items.map(el => {
          const curId = curGetId(el);
          const curValue = curGetValue(el);
          return (
            <MenuItem classes={{ root: menuItem }} disableGutters key={curId} value={curId}>
              <Checkbox color="default" checked={inputValue.indexOf(curId) > -1} size="small" />
              <ListItemText primary={curValue} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
