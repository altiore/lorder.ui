import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingPage from '@components/LoadingPage';
import { RouteWithSubRoutes } from '@domains/@common/RouteWithSubRoutes';
import NotFound from '@domains/NotFound';
import { availableRoutes } from '@store/router';

const App: React.FC = () => {
  const routes = useSelector(availableRoutes);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
        <Redirect from="/index.html" to="/" exact />
        <Redirect from="/" to="/hi" exact />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
