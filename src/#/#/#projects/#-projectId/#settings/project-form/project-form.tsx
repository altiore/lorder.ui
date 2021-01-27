import React, { useMemo } from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import InputField from '@components/input-field';
import { SelectField } from '@components/select-field';

import Card from './card';

import { PROJECT_COLOR, PROJECT_STRATEGY, PROJECT_VIEW_TYPE, ROLE } from '@types';

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

interface IFormData {
  viewColor?: PROJECT_COLOR;
}

export const ProjectFormTsx: React.FC<InjectedFormProps<IFormData> & IProjectForm> = ({
  handleSubmit,
  initialValues,
  pristine,
  submitting,
  userRole,
}) => {
  const isPublic = useMemo(() => Boolean(initialValues?.viewColor), [initialValues]);

  const classes = useStyles();

  return (
    <Grid container>
      {isPublic && (
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
      )}
      <Grid item xs={12} md={isPublic ? 8 : 12}>
        <ListItem>
          <div className={classes.displayNameField}>
            <Field name="title" component={InputField} label="Название" fullWidth />
          </div>
        </ListItem>
        <ListItem>
          <Field name="desc" component={InputField} label="Описание" fullWidth />
        </ListItem>
        {isPublic && (
          <ListItem>
            <Field name="slogan" component={InputField} label="Призыв присоединиться" fullWidth />
          </ListItem>
        )}
        <ListItem>
          <Field name="monthlyBudget" component={InputField} label="Месячный бюджет" fullWidth type="number" />
        </ListItem>
        {isPublic && (
          <ListItem>
            <Field name="viewColor" component={SelectField} label="Цвет фона" fullWidth items={PROJECT_COLOR} />
          </ListItem>
        )}
        {isPublic && (
          <ListItem>
            <Field name="viewType" component={SelectField} label="Тип карточки" fullWidth items={PROJECT_VIEW_TYPE} />
          </ListItem>
        )}
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
      </Grid>
    </Grid>
  );
};
