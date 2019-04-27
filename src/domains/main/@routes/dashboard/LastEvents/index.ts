import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { events } from 'store/tasks';
import { LastEventsTsx } from './LastEvents';
import { styles } from './styles';

const mapState = createStructuredSelector({
  events,
});

export const LastEvents = connect(mapState)(withStyles(styles, { withTheme: true })(LastEventsTsx));
