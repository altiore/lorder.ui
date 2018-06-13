import * as React from 'react';
import { RouteProps } from 'react-router-dom';

import { Button } from 'src/components/Button';

// export interface IProps {
//
// }

export const Login = (props: RouteProps) => (
  <div>
    <h3>Login</h3>
    <Button danger>
      <div>test button</div>
    </Button>
  </div>
);
