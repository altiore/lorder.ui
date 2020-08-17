import { connect } from 'react-redux';

import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { showWarning } from '#/@store/notifications';
import { createUserTaskFormInitials, selectedProject } from '#/@store/projects';
import { CREATE_USER_WORK_FORM_NAME, tryToCreateAndStart } from '#/@store/user-works';

import { StartFormJsx } from './start-form';
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
    reduxForm<any, any>({
      enableReinitialize: true,
      form: CREATE_USER_WORK_FORM_NAME,
      onSubmit: async (_, dispatch, { selectedProject: project }) => {
        if (project?.id) {
          await dispatch(tryToCreateAndStart(project?.id));
        } else {
          dispatch(
            showWarning({
              message: 'Кнопка "+" в левом верхнем углу',
              title: 'Для начала создайте проект',
            })
          );
        }
      },
      onSubmitSuccess(result: any, dispatch: any): void {
        dispatch(change(CREATE_USER_WORK_FORM_NAME, 'description', ''));
        if ('activeElement' in document) {
          (document.activeElement as any).blur();
        }
      },
    })(StartFormJsx as any)
  )
);
