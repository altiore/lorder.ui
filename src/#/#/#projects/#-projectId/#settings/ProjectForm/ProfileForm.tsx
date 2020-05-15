import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import InputField from '@components/InputField';

const parseNumber = i => parseFloat(i);
const formatNumber = i => (typeof i === 'number' ? i.toString() : '');

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 'auto',
  },
  displayNameField: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
}));

export const ProfileForm: React.FC<InjectedFormProps> = ({ submitting, pristine, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div>
      <ListItem>
        <div className={classes.displayNameField}>
          <Field name="title" component={InputField} label="Название" />
        </div>
      </ListItem>
      <ListItem>
        <Field
          name="monthlyBudget"
          component={InputField}
          label="Месячный бюджет"
          parse={parseNumber}
          format={formatNumber}
        />
      </ListItem>
      <ListItem>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting || pristine}
        >
          Обновить
        </Button>
      </ListItem>
    </div>
  );
};
