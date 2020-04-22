import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getFormValues } from 'redux-form';

import { TimeDiffTsx } from './TimeDiff';

const mapStateToProps = createStructuredSelector({
  formValues: getFormValues('EditWorkForm'),
});

export default connect(mapStateToProps)(TimeDiffTsx as any);
