import { withStyles } from '@material-ui/core';

import { MemberCardTsx } from './MemberCard';
import { styles } from './styles';

export const MemberCard = withStyles(styles, { withTheme: true })(MemberCardTsx);
