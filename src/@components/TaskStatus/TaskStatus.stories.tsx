import React from 'react';

import TaskStatus from '.';
import Center from '../../../.storybook/decor/Center';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const assignees = [
  {
    avatar: '',
    id: 1,
    userName: 'razvanlomov@gmail.com',
  },
  {
    avatar: '',
    id: 2,
    userName: 'other@gmail.com',
  },
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
