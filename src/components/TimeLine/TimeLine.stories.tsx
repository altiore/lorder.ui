import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const moment = require('moment');

import { TimeLine } from '.';

const startJob = moment().subtract(5, 'hours');

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
    finishAt: moment().subtract(1, 'hours'),
    isActive: true,
    name: 'Работа',
    startAt: startJob,
  },
];

storiesOf('TimeLine', module).add('default', () => (
  <div style={{ backgroundColor: '#ccc', width: '98%', margin: '100px auto', padding: 8 }}>
    <TimeLine events={events} onChange={action('onEventsChange')} />
  </div>
));
