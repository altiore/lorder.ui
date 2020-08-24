import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectParts, getProjectParts } from '#/@store/projects/parts';
import { getTaskProjectParts } from '#/@store/tasks';

import { ProjectPartsFieldTsx } from './project-parts-field';

import { IProjectPart, IState } from '@types';

interface IMapped {
  getProjectParts: (pId: number) => IProjectPart[];
  getTaskProjectParts: (p: number, sn: number) => IProjectPart[];
}

const mapStateToProps = createStructuredSelector<IState, IMapped>({
  getProjectParts,
  getTaskProjectParts,
});

const mapDispatch = {
  fetchProjectParts,
};

export default connect(mapStateToProps, mapDispatch)(ProjectPartsFieldTsx);
