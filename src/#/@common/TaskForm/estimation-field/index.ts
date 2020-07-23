import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { getMovesByStatus, openedProjectStrategy } from '#/@store/projects';
import { EDIT_TASK_FORM } from '#/@store/tasks';

import { EstimationField } from './estimation-field';

import { IState, PROJECT_STRATEGY } from '@types';

const selector = formValueSelector(EDIT_TASK_FORM);

interface IMappedProps {
  getMovesByStatus: any;
  statusTypeName: any;
  strategy?: PROJECT_STRATEGY;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  getMovesByStatus,
  statusTypeName: state => selector(state, 'statusTypeName'),
  strategy: openedProjectStrategy,
});

export default connect(mapStateToProps)(EstimationField);
