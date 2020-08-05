import React, { useCallback } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface ISwitchFieldProps {
  error?: string;
  items: Array<{ title: string; value: any }>;
  label?: string;
  name?: string;
  onChange: (arg: string | number) => void;
  value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2, 0, 2, 1.5),
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  labelStyle: {
    color: theme.palette.pause.main,
    width: 'calc(50% - 28px)',
  },
}));

export const RadioButtonTsx: React.FC<ISwitchFieldProps> = ({ error, onChange, items, label, name, value }) => {
  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange((event.target as HTMLInputElement).value);
    },
    [onChange]
  );

  const { formControl, info, labelStyle } = useStyles();

  return (
    <FormControl component="fieldset" fullWidth error={Boolean(error)} className={formControl}>
      <div className={info}>
        {label && (
          <Typography component="legend" className={labelStyle}>
            {label}
          </Typography>
        )}
        <RadioGroup onChange={handleRadioChange} aria-label={name} name={name} row value={value}>
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
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
