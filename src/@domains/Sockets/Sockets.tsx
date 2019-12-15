import React from 'react';

import { Field, InjectedFormProps } from 'redux-form';

import { Button } from '@material-ui/core';

import InputField from '@components/InputField';

interface ISocketsComponent extends InjectedFormProps<any, any> {
  socketMessages: string[];
}

export const Sockets: React.FC<ISocketsComponent> = ({ handleSubmit, socketMessages }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sockets:</h1>
      <div>
        <Field name="message" component={InputField} />
        <Button type="submit">Send Message</Button>
        <ul>
          {(socketMessages || []).map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};
