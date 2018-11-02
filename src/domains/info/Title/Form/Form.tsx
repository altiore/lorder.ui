import TextField from '@material-ui/core/TextField';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CalendarIcon from '@material-ui/icons/DateRange';
import * as React from 'react';

export interface IFormProps {
  classes: any;
}

export const FormTsx: React.StatelessComponent<IFormProps> = ({ classes }) => (
  <form className={classes.range} noValidate>
    <span>
      <TextField
        id="date"
        label="From"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <CalendarIcon />
    </span>

    <ArrowRightIcon />

    <span>
      <TextField
        id="date"
        label="To"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <CalendarIcon />
    </span>
  </form>
);
