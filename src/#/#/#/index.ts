import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isTimeEdit, toggleUiSetting } from '#/@store/ui';

import { DashboardJsx } from './dashboard';

import { IState } from '@types';

interface IMapped {
  isTimeEdit: boolean;
}

const mapState = createStructuredSelector<IState, IMapped>({
  isTimeEdit,
});

const mapDispatch = {
  toggleUiSetting,
};

export default connect(mapState, mapDispatch)(DashboardJsx);
