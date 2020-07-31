import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CheckboxField from '@components/CheckboxField';
import { SelectField } from '@components/SelectField';
import { TextField } from '@components/TextField';

import { ICrudColumn } from '../Crud';

export interface ICreateFormProps {
  buttonText?: string;
  columns: ICrudColumn[];
  submitTitle?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > div': {
      '&:last-of-type': {
        marginBottom: theme.spacing(2),
      },
      marginTop: theme.spacing(2),
    },
    minWidth: 240,
    padding: theme.spacing(2),
  },
}));

const doNothing = i => i;
const parseNumber = i => parseFloat(i);
const formatNumber = i => (typeof i === 'number' ? i.toString() : '');

export const CreateFormJsx: React.FC<ICreateFormProps & InjectedFormProps<{}, ICreateFormProps>> = ({
  handleSubmit,
  pristine,
  submitting,
  submitTitle = 'Добавить',
  invalid,
  columns,
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography color="inherit" variant="h5">
        {submitTitle}
      </Typography>
      {columns
        .filter(el => el.name)
        .map(({ name, isBoolean, isNumber, allowed }) => (
          <Field
            key={name}
            name={name}
            component={allowed ? SelectField : isBoolean ? CheckboxField : TextField}
            parse={isNumber ? parseNumber : doNothing}
            format={isNumber ? formatNumber : doNothing}
            items={allowed}
          />
        ))}
      <Button type="submit" disabled={pristine || submitting || invalid} color="primary" variant="contained" fullWidth>
        <span>{submitTitle}</span>
      </Button>
    </form>
  );
};
