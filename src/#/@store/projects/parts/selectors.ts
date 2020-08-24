import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { getProjectById } from '#/@store/projects/selectors';

import { flatToHierarchy } from '@utils/flat-to-hierarchy';

export const getProjectParts = createDeepEqualSelector([getProjectById], getPr => (pId: number) =>
  getPr(pId)?.parts.list || []
);

export const getProjectPartsTree = createDeepEqualSelector([getProjectParts], getParts => (pId: number) =>
  flatToHierarchy(getParts(pId))
);
