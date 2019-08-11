import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Center from '../../../.storybook/decor/Center';
import TaskStatus from '.';

const assignees = [
  {
    id: 1,
    userName: 'razvanlomov@gmail.com',
    avatar: '',
  },
  {
    id: 2,
    userName: 'other@gmail.com',
    avatar: '',
  },
];

storiesOf('TaskStatus', module)
  .addDecorator(Center)
  .add('assigned to me', () => (
    <TaskStatus assignees={assignees} isMine onChangeAssignee={action('Assignee changed:')} />
  ))
  .add('assigned to other', () => <TaskStatus assignees={assignees} onChangeAssignee={action('Assignee changed:')} />);
