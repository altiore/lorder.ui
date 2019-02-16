import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { createUserTaskFormInitials } from 'src/store/project';
import { selectedProject } from 'src/store/projects';
import { CREATE_USER_WORK_FORM_NAME, IUserWorkData, startUserWork } from 'src/store/tasks';
import { IStartFormProps, StartFormJsx } from './StartForm';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  initialValues: createUserTaskFormInitials,
  selectedProject,
});

const StartForm = withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(
    reduxForm<any, IStartFormProps>({
      enableReinitialize: true,
      form: CREATE_USER_WORK_FORM_NAME,
      onSubmit: onSubmitForm<IUserWorkData>(startUserWork),
      onSubmitSuccess(result: any, dispatch: any): void {
        dispatch(change(CREATE_USER_WORK_FORM_NAME, 'description', ''));
      },
    })(StartFormJsx)
  )
);

export { StartForm, IStartFormProps };
