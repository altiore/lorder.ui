import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TextAreaMarkdownTsx } from './TextAreaMarkdown';

export const TextAreaMarkdown = withStyles(styles, { withTheme: true })(TextAreaMarkdownTsx);
