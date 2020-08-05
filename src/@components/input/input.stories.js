import React from 'react';
import { storiesOf } from '@storybook/react';

import UserIco from '@material-ui/icons/PermIdentity';

import InputField from '.';
const inputs = [
  { component: <InputField />, description: 'simple input field' },
  {
    component: <InputField placeholder="Placeholder" />,
    description: 'input with placeholder',
  },
  { component: <InputField label="Label" />, description: 'input with label' },
  {
    component: <InputField label="Label" placeholder="Placeholder" />,
    description: 'input with label and placeholder',
  },
  {
    component: <InputField helperText="Helper Text" />,
    description: 'input with helper text',
  },
  {
    component: <InputField error helperText="Error Text" />,
    description: 'input without error and with helper text',
  },
  {
    component: <InputField icon={<UserIco />} />,
    description: 'input with Icon',
  },
  {
    component: (
      <InputField
        icon={<UserIco />}
        error
        helperText="Error Text Error Text Error 
  Text Error Text Error Text  Error Text 
  Error Text Error Text Error Text Error 
  Text Error Text Error Text Error Text 
  Error Text Error Text Error Text Error 
  Text Error Text Error Text Error Text
  Error Text Error Text Error Text Error
  Text Error Text"
      />
    ),
    description: 'input with error and huge error message',
  },
];
storiesOf('Input', module).add('default', () => (
  <div style={{ maxWidth: 800 }}>
    {inputs.map(({ component, description }) => (
      <div>
        <h2>{description}</h2>
        <div style={{ margin: '20px 0' }}>{component}</div>
        <hr />
      </div>
    ))}
  </div>
));
