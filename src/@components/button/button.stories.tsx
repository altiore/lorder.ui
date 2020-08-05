import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Center from '../../../.storybook/decor/Center';

import { storiesOf } from '@storybook/react';

const columnStyle = {
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'column nowrap',
};

const ButtonsBlock = ({ color }) => {
  return (
    <div style={{ padding: '0 8px', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <div style={{ padding: 4 }}>
        <Button color={color}>default</Button>
      </div>
      <div style={{ padding: 4 }}>
        <Button color={color} variant="outlined">
          outlined
        </Button>
      </div>
      <div style={{ padding: 4 }}>
        <Button color={color} variant="contained">
          contained
        </Button>
      </div>
      <div style={{ padding: 4 }}>
        <Button color={color} variant="text">
          text
        </Button>
      </div>
    </div>
  );
};

const AllButtons = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row nowrap', flexGrow: 1, justifyContent: 'space-between' }}>
      <div style={columnStyle}>
        <h1>color="default"</h1>
        <ButtonsBlock color="default" />
      </div>
      <div style={columnStyle}>
        <h1>color="primary"</h1>
        <ButtonsBlock color="primary" />
      </div>
      <div style={columnStyle}>
        <h1>color="secondary"</h1>
        <ButtonsBlock color="secondary" />
      </div>
    </div>
  );
};

const paperStyle = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 240,
  padding: 8,
  width: '100%',
};

storiesOf('Button', module)
  .addDecorator(Center)
  .add('Все кнопки', () => (
    <div
      style={{ position: 'relative', minWidth: 860, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}
    >
      <Paper style={{ backgroundColor: '#FFF', ...paperStyle }}>
        <AllButtons />
      </Paper>
      <Paper style={{ backgroundColor: '#F1F3F5', ...paperStyle }}>
        <AllButtons />
      </Paper>
      <Paper style={{ backgroundColor: '#29292B', ...paperStyle }}>
        <AllButtons />
      </Paper>
    </div>
  ));
