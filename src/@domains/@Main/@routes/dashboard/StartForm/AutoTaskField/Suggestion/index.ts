import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { SuggestionTsx } from './Suggestion';

export default withStyles(styles, { withTheme: true })(SuggestionTsx);
