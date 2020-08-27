import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import InputField from '@components/input-field';
import { SelectField } from '@components/select-field';

import { PROJECT_STRATEGY, ROLE } from '@types';

const parseNumber = i => parseFloat(i);
const formatNumber = i => (typeof i === 'number' ? i.toString() : '');

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

interface IProjectForm {
  userRole: ROLE;
}

export const ProjectFormTsx: React.FC<InjectedFormProps & IProjectForm> = ({
  handleSubmit,
  pristine,
  submitting,
  userRole,
}) => {
  const classes = useStyles();

  return (
    <div>
      <ListItem>
        <div className={classes.displayNameField}>
          <Field name="title" component={InputField} label="Название" fullWidth />
        </div>
      </ListItem>
      <ListItem>
        <Field name="desc" component={InputField} label="Описание" fullWidth />
      </ListItem>
      <ListItem>
        <Field name="slogan" component={InputField} label="Призыв присоединиться" fullWidth />
      </ListItem>
      <ListItem>
        <Field
          name="monthlyBudget"
          component={InputField}
          label="Месячный бюджет"
          fullWidth
          parse={parseNumber}
          format={formatNumber}
        />
      </ListItem>
      <Tooltip title="В разработке. Скоро будет доступно">
        <ListItem>
          <Field
            name="strategy"
            // TODO: удалить, когда функционал будет готов
            disabled={userRole !== ROLE.SUPER_ADMIN}
            component={SelectField}
            items={PROJECT_STRATEGY}
            label="Стратегия перемещения задач"
          />
        </ListItem>
      </Tooltip>
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
