import React from 'react';

import { Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { SelectField } from '@components/SelectField';
import TextAreaMarkdown from '@components/TextAreaMarkdown';

import { TextField } from '.';
import FormDecorator from '../../../.storybook/decor/FormDecorator';

import { storiesOf } from '@storybook/react';

enum YesOrNo {
  YES = 'да',
  NO = 'нет',
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: 500,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 200,
    padding: theme.spacing(2),
  },
}));

storiesOf('TextField', module)
  .addDecorator(FormDecorator)
  .add('default', () => {
    const { form, root } = useStyles();
    return (
      <div className={root}>
        <div className={form}>
          <Field name="test" component={TextField} />
          <Field name="select" component={SelectField} items={YesOrNo} />
          <Field placeholder="Описание задачи..." name="description" component={TextAreaMarkdown} />
          <Button type="submit">Отправить</Button>
        </div>
      </div>
    );
  });
