import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { fetchProjectParts, projectParts } from '#/@store/project';
import { openedProjectUserRoles, projectMembersAsUsers } from '#/@store/projects';
import { rolesList } from '#/@store/roles';
import { changeFilter, filteredMembers, searchTerm, toggleMember, toggleProjectPart } from '#/@store/tasksFilter';
import { projectPart } from '#/@store/tasksFilter';
import { isBoardFilterOpened, toggleUiSetting } from '#/@store/ui';

import { FiltersTsx } from './Filters';
import { styles } from './styles';

const mapState = createStructuredSelector({
  filteredMembers,
  isBoardFilterOpened,
  members: projectMembersAsUsers,
  openedProjectUserRoles,
  projectPart,
  projectParts,
  rolesList,
  searchTerm,
} as any);

const mapDispatch = {
  changeFilter,
  fetchProjectParts,
  toggleMember,
  toggleProjectPart,
  toggleUiSetting,
};

export default connect(mapState, mapDispatch)(withStyles(styles, { withTheme: true })(FiltersTsx));
