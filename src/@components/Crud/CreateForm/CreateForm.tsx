import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { SelectField } from '@components/SelectField';
import { TextField } from '@components/TextField';

import { Field, InjectedFormProps } from 'redux-form';

import { ICrudColumn } from '../Crud';

export interface ICreateFormProps {
  buttonText?: string;
  columns: ICrudColumn[];
  createTitle: string;
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
  createTitle,
  handleSubmit,
  pristine,
  submitting,
  invalid,
  columns,
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography color="inherit" variant="h5">
        {createTitle}
      </Typography>
      {columns
        .filter(el => el.name)
        .map(({ name, isNumber, allowed }) => (
          <Field
            key={name}
            name={name}
            component={allowed ? SelectField : TextField}
            parse={isNumber ? parseNumber : doNothing}
            format={isNumber ? formatNumber : doNothing}
            items={allowed}
          />
        ))}
      <Button type="submit" disabled={pristine || submitting || invalid} color="primary" variant="contained" fullWidth>
        <span>{createTitle}</span>
      </Button>
    </form>
  );
};
