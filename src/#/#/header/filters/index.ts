import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectParts, projectParts } from '#/@store/project';
import { projectMembersAsUsers } from '#/@store/projects';
import {
  changeFilter,
  filteredMembers,
  projectParts as selectedParts,
  searchTerm,
  toggleMember,
} from '#/@store/tasksFilter';
import { isBoardFilterOpened, toggleUiSetting } from '#/@store/ui';

import { FiltersTsx } from './filters';

import { IProjectPart, IState, IUser } from '@types';

interface IMappedProps {
  filteredMembers: any;
  isBoardFilterOpened: boolean;
  members: IUser[];
  projectParts: IProjectPart[];
  searchTerm: string;
  selectedParts: number[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  filteredMembers,
  isBoardFilterOpened,
  members: projectMembersAsUsers,
  projectParts,
  searchTerm,
  selectedParts,
});

const mapDispatch = {
  changeFilter,
  fetchProjectParts,
  toggleMember,
  toggleUiSetting,
};

export default connect(mapState, mapDispatch)(FiltersTsx);
