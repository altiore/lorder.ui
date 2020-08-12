import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import SelectTree from '.';
import CenterDecorator from '../../../.storybook/decor/Center';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

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

const items = [
  {
    id: 1,
    parentId: null,
    title: 'Test1',
  },
  {
    id: 2,
    parentId: null,
    title: 'Test2',
  },
  {
    id: 3,
    parentId: 1,
    title: 'Test3',
  },
  {
    id: 4,
    parentId: 1,
    title: 'Test4',
  },
  {
    id: 5,
    parentId: 2,
    title: 'Test5',
  },
  {
    id: 6,
    parentId: 5,
    title: 'Test6',
  },
  {
    id: 7,
    parentId: 6,
    title: 'Test7',
  },
  {
    id: 8,
    parentId: 2,
    title: 'Test8',
  },
  {
    id: 9,
    parentId: 2,
    title: 'Test9',
  },
  {
    id: 10,
    parentId: 5,
    title: 'Test10',
  },
  {
    id: 11,
    parentId: 5,
    title: 'Test11',
  },
];

storiesOf('SelectTree', module)
  .addDecorator(CenterDecorator)
  .add('default', () => {
    const { form, root } = useStyles();
    return (
      <div className={root}>
        <div className={form}>
          <SelectTree value={[]} items={items} onChange={action('onChange')} />
          <br />
        </div>
      </div>
    );
  });
