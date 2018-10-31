import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers';
import { EDIT_USER_WORK_DESCRIPTION_FORM, IUpdateUserWork, patchUserWork } from 'src/store/tasks';
import { DescriptionFormTsx } from './DescriptionForm';

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
  onSubmit: onSubmitForm(patchUserWork, ({ projectId, taskId, userWorkId }) => ({ projectId, taskId, userWorkId })),
})(DescriptionFormTsx as any) as any);
