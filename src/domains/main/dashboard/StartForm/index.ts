import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { selectedProjectId } from 'src/store/project';
import { CREATE_USER_TASK_FORM_NAME, IUserTaskData, startUserTask } from 'src/store/user-tasks';
import { IStartFormProps, StartFormJsx } from './StartForm';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  selectedProjectId,
});

const StartForm = withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(
    reduxForm<any, IStartFormProps>({
      form: CREATE_USER_TASK_FORM_NAME,
      onSubmit: onSubmitForm<IUserTaskData>(startUserTask, props => ({ projectId: props.selectedProjectId })),
      // onSubmitSuccess: (res, dispatch, { goToNext }) => goToNext(),
    })(StartFormJsx)
  )
);

export { StartForm, IStartFormProps };
