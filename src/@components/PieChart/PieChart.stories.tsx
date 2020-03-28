import React from 'react';

import { PieChart } from './PieChart';

import { storiesOf } from '@storybook/react';

const pieData = [
  { name: 'Jane', y: 13 },
  { name: 'John', y: 23 },
  { name: 'Joe', y: 19 },
  { name: 'Joe', y: 65 },
  { name: 'Joe', y: 10 },
  { name: 'Joe', y: 1 },
  { name: 'Joe', y: 6 },
  { name: 'Joe', y: 109 },
  { name: 'Joe', y: 219 },
];

storiesOf('PieChart', module).add('with text', () => <PieChart data={pieData} />);
