import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Theme } from '@material-ui/core/styles';

import InputField from '@components/InputField';

import { parseStrToUndefined } from '@utils/parseFormat';

const useStyles = makeStyles((theme: Theme) => ({
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
  const { button, displayNameField } = useStyles();

  return (
    <>
      <ListItem>
        <div className={displayNameField}>
          <Field name="displayName" component={InputField} label="Показываемое имя" parse={parseStrToUndefined} />
        </div>
      </ListItem>
      <ListItem>
        <Field name="tel" component={InputField} label="Телефон" parse={parseStrToUndefined} />
      </ListItem>
      <ListItem>
        <Button
          className={button}
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting || pristine}
        >
          Обновить
        </Button>
      </ListItem>
    </>
  );
};
