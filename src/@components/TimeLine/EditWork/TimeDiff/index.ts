import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';

import { IEditWorkData } from '../@common';
import { ITimeDiff, TimeDiffTsx } from './TimeDiff';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<Partial<IState>, ITimeDiff>({
  formValues: getFormValues('EditWorkForm') as Selector<Partial<IState>, IEditWorkData>,
});

export default connect<ITimeDiff>(mapStateToProps)(TimeDiffTsx);
