import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { createUserTaskFormInitials } from 'src/store/project';
import { CREATE_USER_WORK_FORM_NAME, IUserWorkData, startUserWork, stopUserWork } from 'src/store/tasks';
import { currentUserWorkData, isTimerStarted } from 'src/store/timer';
import { IStartFormProps, StartFormJsx } from './StartForm';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  currentUserWorkData,
  initialValues: createUserTaskFormInitials,
  isTimerStarted,
});

const mapDispatchToProps = {
  stopUserWork,
};

const mergeProps = (
  { currentUserWorkData, ...restState }: any,
  { stopUserWork, ...restDispatch }: any,
  ownProps: any
) => ({
  ...restState,
  ...restDispatch,
  ...ownProps,
  stopUserWork: () => stopUserWork(currentUserWorkData),
});

const StartForm = withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(
    reduxForm<any, IStartFormProps>({
      form: CREATE_USER_WORK_FORM_NAME,
      onSubmit: onSubmitForm<IUserWorkData>(startUserWork),
      // onSubmitSuccess: (res, dispatch, { goToNext }) => goToNext(),
    })(StartFormJsx)
  )
);

export { StartForm, IStartFormProps };
