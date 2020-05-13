import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { getProjectMemberById } from '#/@store/projects';

import { styles } from './styles';
import { TaskCardTsx } from './TaskCard';

const mapState = createStructuredSelector({
  getProjectMemberById,
});

export const TaskCard = connect(mapState)(withStyles(styles)(TaskCardTsx) as any) as any;
