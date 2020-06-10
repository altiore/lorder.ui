import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const runStory = (story: any) => story;

export default (getStory: any) => (
  <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
    <Route path="/" component={runStory(getStory)} />
  </Router>
);
