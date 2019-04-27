import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userRole } from 'store/identity';

import { CheckRoleTsx } from './CheckRole';

const mapToState = createStructuredSelector({
  userRole,
});

export const CheckRole = connect(mapToState)(CheckRoleTsx);
