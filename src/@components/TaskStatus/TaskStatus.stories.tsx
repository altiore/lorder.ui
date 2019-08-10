import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Center from '../../../.storybook/decor/Center';
import TaskStatus from '.';

storiesOf('TaskStatus', module)
  .addDecorator(Center)
  .add('assigned to me', () => <TaskStatus isMine onChangeAssignee={action('Assignee changed:')} />)
  .add('assigned to other', () => <TaskStatus onChangeAssignee={action('Assignee changed:')} />);
