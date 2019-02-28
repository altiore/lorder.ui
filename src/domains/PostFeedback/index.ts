import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { postFeedback } from 'src/store/feedback';
import { PostFeedbackTsx } from './PostFeedback';
import { styles } from './styles';

export const PostFeedback = withStyles(styles, { withTheme: true })(
  reduxForm({
    form: 'FeedbackForm',
    onSubmit: onSubmitForm(postFeedback),
    onSubmitFail,
    onSubmitSuccess: (result: any, dispatch: any) => {
      dispatch(closeDialog());
    },
  })(PostFeedbackTsx)
);
