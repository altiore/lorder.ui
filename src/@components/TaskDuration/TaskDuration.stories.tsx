import React from 'react';

import TaskDuration from '.';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Center from "../../../.storybook/decor/Center";

storiesOf('TaskDuration', module).addDecorator(Center)
    .add('default', () => (
        <div style={{ backgroundColor: '#fff', padding: 8 }}>
    <TaskDuration
      time={0} onClick={action('onClick')} hoursPerDay={24}
    />
  </div>
)).add('days & hours', () => (
    <div style={{ backgroundColor: '#fff', padding: 8 }}>
        <TaskDuration
            time={2678340000} onClick={action('onClick')} hoursPerDay={24}
        />
    </div>
)).add('hours & minutes', () => (
    <div style={{ backgroundColor: '#fff', padding: 8 }}>
        <TaskDuration
            time={86340000} onClick={action('onClick')} hoursPerDay={24}
        />
    </div>
)).add('minutes & seconds', () => (
    <div style={{ backgroundColor: '#fff', padding: 8 }}>
        <TaskDuration
            time={3599000} onClick={action('onClick')} hoursPerDay={24}
        />
    </div>
));
