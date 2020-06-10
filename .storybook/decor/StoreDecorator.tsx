import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = () => {};
export default (getStory: any) => {
  return <Provider store={createStore(reducer)}>{getStory()}</Provider>;
};
