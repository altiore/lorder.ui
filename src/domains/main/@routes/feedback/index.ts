import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'hocs/withResize';
import { feedbackList, fetchFeedbackList } from 'store/feedback';
import { Feedback as FeedbackJsx } from './Feedback';
import { styles } from './styles';

export const Feedback = connect(
  createStructuredSelector({
    feedbackList,
  }),
  {
    fetchFeedbackList,
  }
)(withResize(withStyles(styles, { withTheme: true })(FeedbackJsx)));
