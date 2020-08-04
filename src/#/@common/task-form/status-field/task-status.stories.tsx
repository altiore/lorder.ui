import React from 'react';

import { reduxForm } from 'redux-form';

import Center from '../../../../../.storybook/decor/Center';
import FormDecorator from '../../../../../.storybook/decor/FormDecorator';
import { TaskStatus } from './task-status';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { IUser } from '@types';

const assignees: IUser[] = [
  {
    avatar: undefined,
    id: 1,
    userName: 'razvanlomov@gmail.com',
  } as IUser,
  {
    avatar: undefined,
    id: 2,
    userName: 'other@gmail.com',
  } as IUser,
];

const MyForm1 = reduxForm({
  form: 'test1',
})(TaskStatus as any) as any;

storiesOf('TaskStatus', module)
  .addDecorator(Center)
  .addDecorator(FormDecorator)
  .add('assigned to me', () => (
    <MyForm1
      statuses={[]}
      assignees={assignees}
      isMine
      onChangeAssignee={action('Assignee changed:')}
      onStart={action('Start task')}
      onStop={action('Stop task')}
    />
  ))
  .add('assigned to other', () => (
    <MyForm1
      statuses={[]}
      assignees={assignees}
      onChangeAssignee={action('Assignee changed:')}
      onStart={action('Start task')}
      onStop={action('Stop task')}
    />
  ));
