import { withStyles } from '@material-ui/core/styles';

import { ShortChartTsx } from './ShortChart';
import { styles } from './styles';

export const ShortChart = withStyles(styles, { withTheme: true })(ShortChartTsx);
