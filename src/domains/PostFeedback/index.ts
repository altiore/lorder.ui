import { withStyles } from '@material-ui/core/styles';

import { PostFeedbackTsx } from './PostFeedback';
import { styles } from './styles';

export const PostFeedback = withStyles(styles, { withTheme: true })(PostFeedbackTsx);
