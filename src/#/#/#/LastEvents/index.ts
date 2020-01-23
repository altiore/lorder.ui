import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { events } from '#/@store/tasks';
import { LastEventsTsx } from './LastEvents';
import { styles } from './styles';

const mapState = createStructuredSelector({
  events,
} as any);

export const LastEvents = connect<any, any, any>(mapState)(withStyles(styles, { withTheme: true })(LastEventsTsx));
