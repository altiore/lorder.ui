import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { feedbackList, fetchFeedbackList } from '#/@store/feedback';

import { Feedback as FeedbackJsx } from './Feedback';
import { styles } from './styles';

import { withResize } from '@hooks/withResize';

export default connect(
  createStructuredSelector({
    feedbackList,
  } as any),
  {
    fetchFeedbackList,
  }
)(withResize(withStyles(styles, { withTheme: true })(FeedbackJsx)));
