import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { projectMembersAsUsers } from 'src/store/projects';
import { changeFilter, filteredMembers, searchTerm, toggleMember } from 'src/store/tasksFilter';
import { FiltersTsx } from './Filters';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filteredMembers,
  members: projectMembersAsUsers,
  searchTerm,
});

const mapDispatch = {
  changeFilter,
  toggleMember,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(FiltersTsx));
