import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CheckboxField from '@components/checkbox-field';
import { SelectField } from '@components/select-field';
import { TextField } from '@components/text-field';

import { ICrudColumn } from '../crud';

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
const parseNumber = i => (typeof i === 'string' ? parseFloat(i) : i);
const formatNumber = i => (typeof i === 'number' ? i.toString() : i);

export const CreateFormJsx: React.FC<ICreateFormProps & InjectedFormProps<{}, ICreateFormProps>> = ({
  initialValues,
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
        .map(({ name, isBoolean, isNumber, allowed, fieldComponent, fieldProps }) => (
          <Field
            key={name}
            name={name}
            component={fieldComponent || (allowed ? SelectField : isBoolean ? CheckboxField : TextField)}
            parse={isNumber ? parseNumber : doNothing}
            format={isNumber ? formatNumber : doNothing}
            items={allowed}
            {...(fieldProps ? (typeof fieldProps === 'function' ? fieldProps(initialValues) : fieldProps) : {})}
          />
        ))}
      <Button type="submit" disabled={pristine || submitting || invalid} color="primary" variant="contained" fullWidth>
        <span>{submitTitle}</span>
      </Button>
    </form>
  );
};
