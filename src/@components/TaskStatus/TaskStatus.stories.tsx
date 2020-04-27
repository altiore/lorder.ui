import React from 'react';

import TaskStatus from '.';
import Center from '../../../.storybook/decor/Center';
import { IUser } from '../../@types';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

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

storiesOf('TaskStatus', module)
  .addDecorator(Center)
  .add('assigned to me', () => (
    <TaskStatus
      statuses={[]}
      assignees={assignees}
      isMine
      onChangeAssignee={action('Assignee changed:')}
      onStart={action('Start task')}
      onStop={action('Stop task')}
    />
  ))
  .add('assigned to other', () => (
    <TaskStatus
      statuses={[]}
      assignees={assignees}
      onChangeAssignee={action('Assignee changed:')}
      onStart={action('Start task')}
      onStop={action('Stop task')}
    />
  ));
