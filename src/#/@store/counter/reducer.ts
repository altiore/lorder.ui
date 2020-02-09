import { createReducer } from 'aglos';

import * as actions from './actions';

export default createReducer({ counter: 0 }, actions);
