import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { getMovesByStatus } from '#/@store/projects';
import { EDIT_TASK_FORM } from '#/@store/tasks';

import { DurationAdditionalField } from './duration-additional-field';

import { IState } from '@types';

const selector = formValueSelector(EDIT_TASK_FORM);

const mapStateToProps = createStructuredSelector<IState, { getMovesByStatus: any; statusTypeName: any }>({
  getMovesByStatus,
  statusTypeName: state => selector(state, 'statusTypeName'),
});

export default connect(mapStateToProps)(DurationAdditionalField);
