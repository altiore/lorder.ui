import React from 'react';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import InputField from '@components/InputField';

import { updateProfile } from '#/@store/identity';

import { Field, InjectedFormProps } from 'redux-form';

export interface IProfileFormProps extends InjectedFormProps {
  updateProfile: typeof updateProfile;
}

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

export const ProfileForm: React.FC<IProfileFormProps> = ({
  submitting,
  pristine,
  handleSubmit,
  updateProfile,
}: IProfileFormProps) => {
  const classes = useStyles();

  return (
    <>
      <ListItem>
        <div className={classes.displayNameField}>
          <Field name="displayName" component={InputField} label="Показываемое имя" />
        </div>
      </ListItem>
      <ListItem>
        <Field name="tel" component={InputField} label="Телефон" />
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
    </>
  );
};
