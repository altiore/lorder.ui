import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';

import ITimeDiff from '@components/time-diff';

import { IEditWorkData } from '../@common';

import { IState } from '@types';

interface IMappedProps {
  formValues: IEditWorkData;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  formValues: getFormValues('EditWorkForm') as Selector<Partial<IState>, IEditWorkData>,
});

export default connect(mapStateToProps)(ITimeDiff);
