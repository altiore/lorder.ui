import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  createProjectPart,
  deleteProjectPart,
  fetchProjectParts,
  getProjectParts,
  getProjectPartsTree,
  updateProjectPart,
} from '#/@store/projects/parts';

import { ProjectPartsJsx } from './parts';

import { IProjectPart, IState } from '@types';

interface IMappedProps {
  getProjectParts: (pId: number) => IProjectPart[];
  getProjectPartsTree: (pId: number) => any[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  getProjectParts,
  getProjectPartsTree,
});

const mapDispatch = {
  createProjectPart,
  deleteProjectPart,
  fetchProjectParts,
  push,
  updateProjectPart,
};

export default connect(mapState, mapDispatch)(ProjectPartsJsx);
