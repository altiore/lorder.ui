import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { TimeLine } from '.';

const moment = require('moment');

const startJob = moment().subtract(5, 'hours');
const startJob3 = moment().subtract(1, 'hours');

const events = [
  {
    data: 1,
    finishAt: startJob,
    isActive: false,
    name: 'Сон',
    startAt: moment()
      .subtract(1, 'day')
      .set('hours', 23),
  },
  {
    data: 2,
    finishAt: startJob3,
    isActive: true,
    name: 'Работа',
    startAt: startJob,
  },
  {
    data: 3,
    finishAt: null,
    isActive: true,
    name: 'Работа вторая',
    startAt: startJob3,
  },
];

storiesOf('TimeLine', module).add('default', () => (
  <div style={{ backgroundColor: '#fff', width: '98%', margin: '100px auto', padding: 8 }}>
    <TimeLine
      events={events}
      onChange={action('onEventsChange')}
      onEventClick={action('onEventClick')}
      startAt={0}
      finishAt={23}
    />
  </div>
));
