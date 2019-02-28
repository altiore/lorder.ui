import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { projectMembersAsUsers } from 'src/store/projects';
import { changeFilter, filteredMembers, searchTerm, toggleMember } from 'src/store/tasksFilter';
import { isBoardFilterOpened, toggleUiSetting } from 'src/store/ui';
import { FiltersTsx } from './Filters';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filteredMembers,
  isBoardFilterOpened,
  members: projectMembersAsUsers,
  searchTerm,
});

const mapDispatch = {
  changeFilter,
  toggleMember,
  toggleUiSetting,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(FiltersTsx));
