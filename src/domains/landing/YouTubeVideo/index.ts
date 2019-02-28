import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { YouTubeVideoTsx } from './YouTubeVideo';

export const YouTubeVideo = withStyles(styles, { withTheme: true })(YouTubeVideoTsx);
