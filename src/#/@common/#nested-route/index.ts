import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { asyncReducersList } from '#/@store/asyncReducers';
import { isAuth } from '#/@store/identity';

import { NestedRoute } from './nested-route';

import { IState } from '@types';

interface IMappedProps {
  asyncReducersList: any;
  isAuth: boolean;
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  asyncReducersList,
  isAuth,
});

export default connect(mapState)(NestedRoute);
