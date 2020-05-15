import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { TimeDiffTsx } from './TimeDiff';

const mapStateToProps = createStructuredSelector({
  formValues: getFormValues('EditWorkForm'),
});

export default connect(mapStateToProps)(TimeDiffTsx as any);
