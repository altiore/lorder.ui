import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TourCardTsx } from './TourCard';

export const TourCard = withStyles(styles, { withTheme: true })(TourCardTsx);
