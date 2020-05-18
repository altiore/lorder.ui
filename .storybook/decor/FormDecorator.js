import React from 'react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer, reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

const mockStore = createStore(combineReducers({ form: reducer }));

const MyForm = ({ handleChange, handleSubmit, getStory }) => {
  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {getStory()}
    </form>
  );
};

const Form = reduxForm({
  form: 'TestForm',
})(MyForm);

const FormDecorator = getStory => {
  return (
    <Provider store={mockStore}>
      <Form getStory={getStory} onSubmit={action('Submit')} />
    </Provider>
  );
};

export default FormDecorator;
