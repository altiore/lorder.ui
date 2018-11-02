import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { team, tours } from './data';
import { InfoTsx } from './Info';
import { styles } from './styles';

const masStateToProps = () => ({
  brandName: 'Altiore',
  team,
  tours,
});

export const Info = connect(masStateToProps)(withStyles(styles, { withTheme: true })(InfoTsx));
