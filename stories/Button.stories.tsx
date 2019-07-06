import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Button from '@material-ui/core/Button';

storiesOf('Button', module)
  .add('variant="text", color="default"', () => <Button>Hello Button</Button>)
  .add('variant="text", color="primary"', () => <Button color="primary">Hello Button</Button>)
  .add('variant="text", color="secondary"', () => <Button color="secondary">Hello Button</Button>)
  .add('variant="outlined", color="default"', () => <Button variant="outlined">Hello Button</Button>)
  .add('variant="outlined", color="primary"', () => (
    <Button variant="outlined" color="primary">
      Hello Button
    </Button>
  ))
  .add('variant="outlined", color="secondary"', () => (
    <Button variant="outlined" color="secondary">
      Hello Button
    </Button>
  ))
  .add('variant="contained", color="default"', () => <Button variant="contained">Hello Button</Button>)
  .add('variant="contained", color="primary"', () => (
    <Button variant="contained" color="primary">
      Hello Button
    </Button>
  ))
  .add('variant="contained", color="secondary"', () => (
    <Button variant="contained" color="secondary">
      Hello Button
    </Button>
  ));
