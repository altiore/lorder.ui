import { reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';

import { onSubmitFail, onSubmitForm } from '#/@store/@common/helpers';
import { closeDialog } from '#/@store/dialog';
import { postFeedback } from '#/@store/feedback';

import { PostFeedbackTsx } from './PostFeedback';
import { styles } from './styles';

export const PostFeedback = withStyles(styles)(
  reduxForm({
    form: 'FeedbackForm',
    onSubmit: onSubmitForm(postFeedback),
    onSubmitFail,
    onSubmitSuccess: (result: any, dispatch: any) => {
      dispatch(closeDialog());
    },
  })(PostFeedbackTsx as any)
);
