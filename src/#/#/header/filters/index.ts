import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { projectMembersAsUsers } from '#/@store/projects';
import { fetchProjectParts, getProjectParts } from '#/@store/projects/parts';
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
  getProjectParts: (pId: number) => IProjectPart[];
  members: IUser[];
  searchTerm: string;
  selectedParts: number[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  filteredMembers,
  getProjectParts,
  isBoardFilterOpened,
  members: projectMembersAsUsers,
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
