import { withStyles } from '@material-ui/core';

import { FormTsx } from './Form';
import { styles } from './styles';

export const Form = withStyles(styles, { withTheme: true })(FormTsx);
