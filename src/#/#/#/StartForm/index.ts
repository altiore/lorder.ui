import { connect } from 'react-redux';

import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { onSubmitForm } from '#/@store/@common/helpers';
import { createUserTaskFormInitials, selectedProject } from '#/@store/projects';
import { CREATE_USER_WORK_FORM_NAME, IUserWorkData, startUserWork } from '#/@store/user-works';

import { IStartFormProps, StartFormJsx } from './StartForm';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  initialValues: createUserTaskFormInitials,
  selectedProject,
} as any);

const dispatchStateToProps = {};

export const StartForm = withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    dispatchStateToProps
  )(
    reduxForm<any, IStartFormProps>({
      enableReinitialize: true,
      form: CREATE_USER_WORK_FORM_NAME,
      onSubmit: onSubmitForm<IUserWorkData>(startUserWork),
      onSubmitSuccess(result: any, dispatch: any): void {
        dispatch(change(CREATE_USER_WORK_FORM_NAME, 'description', ''));
        if ('activeElement' in document) {
          (document.activeElement as any).blur();
        }
      },
    })(StartFormJsx as any)
  )
);
