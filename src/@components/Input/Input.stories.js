import React from 'react';
import { storiesOf } from '@storybook/react';

import UserIco from '@material-ui/icons/PermIdentity';

import InputField from '.';

storiesOf('Input', module).add('default', () => (
  <div style={{ maxWidth: 800 }}>
    <InputField />
    <InputField placeholder="Placeholder" />
    <InputField label="Label" />
    <InputField label="Label" placeholder="Placeholder" />
    <InputField helperText="Helper Text" />
    <InputField error helperText="Error Text" />
    <InputField icon={<UserIco />} />
    <InputField icon={<UserIco />} helperText="Error Text" />
    <InputField icon={<UserIco />} error helperText="Error Text" />
  </div>
));
