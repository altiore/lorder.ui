import React from 'react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer } from 'redux-form';

const mockStore = createStore(combineReducers({ form: reducer }));

const FormDecorator = getStory => <Provider store={mockStore}>{getStory()}</Provider>;

export default FormDecorator;
