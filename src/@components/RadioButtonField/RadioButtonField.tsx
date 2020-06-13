import React, { useCallback } from 'react';

import { WrappedFieldProps } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface ISwitchFieldProps extends WrappedFieldProps {
  items: Array<{ title: string; value: any }>;
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  labelStyle: {
    color: theme.palette.pause.main,
    width: 'calc(50% - 16px)',
  },
}));

export const RadioButtonField: React.FC<ISwitchFieldProps> = ({ input, items, label, meta }) => {
  const { value, onChange } = input;

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange((event.target as HTMLInputElement).value);
    },
    [onChange]
  );

  const { formControl, info, labelStyle } = useStyles();

  return (
    <FormControl component="fieldset" fullWidth error={Boolean(meta.error)} className={formControl}>
      <div className={info}>
        <Typography component="legend" className={labelStyle}>
          {label}
        </Typography>
        <RadioGroup aria-label={input.name} name={input.name} onChange={handleRadioChange} row value={value}>
          {items.map(({ title, value: itemValue }) => (
            <FormControlLabel
              key={itemValue}
              control={<Radio color="primary" />}
              label={title}
              labelPlacement="end"
              value={itemValue}
            />
          ))}
        </RadioGroup>
      </div>
      <FormHelperText>{meta.error}</FormHelperText>
    </FormControl>
  );
};
