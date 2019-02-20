import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers';
import { IUpdateUserWork } from 'src/store/tasks';
import { EDIT_USER_WORK_DESCRIPTION_FORM, patchUserWork } from 'src/store/user-works';
import { DescriptionFormTsx } from './DescriptionForm';
import { styles } from './styles';

const mapDispatchToProps = {
  patchUserWork,
};

const mergeProps = (state: any, props: any, { userWorkId, ...restOwn }: any) => ({
  ...props,
  ...restOwn,
  form: EDIT_USER_WORK_DESCRIPTION_FORM + userWorkId,
  userWorkId,
});

export const DescriptionForm = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(reduxForm<IUpdateUserWork, IUpdateUserWork>({
  enableReinitialize: true,
  onSubmit: onSubmitForm<any, any>(patchUserWork, ({ projectId, taskId, userWorkId }) => ({
    id: userWorkId,
    projectId,
    taskId,
  })),
})(withStyles(styles, { withTheme: true })(DescriptionFormTsx) as any) as any);
