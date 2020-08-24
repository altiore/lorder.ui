import React, { useEffect, useMemo } from 'react';

import { IMultiSelectField, MultipleSelectField } from '@components/multi-select-field/multi-select-field';

import { IProjectPart } from '@types';

interface IProjectPartsField extends IMultiSelectField {
  fetchProjectParts: any;
  getProjectParts: (pId: number) => IProjectPart[];
  getTaskProjectParts: (p: number, sn: number) => IProjectPart[];
  projectId: number;
  sequenceNumber: number;
}

export const ProjectPartsFieldTsx: React.FC<IProjectPartsField> = props => {
  const {
    fetchProjectParts,
    getProjectParts,
    getTaskProjectParts,
    projectId,
    sequenceNumber,
    ...selectFieldProps
  } = props;

  useEffect(() => {
    const parts = getProjectParts(projectId);
    if (fetchProjectParts && projectId && !parts?.length) {
      fetchProjectParts(projectId);
    }
  }, [fetchProjectParts, projectId, getProjectParts]);

  const items = useMemo(() => {
    const parts = getProjectParts(projectId);
    if (parts && parts.length) {
      return parts;
    }
    return getTaskProjectParts(projectId, sequenceNumber) || [];
  }, [getTaskProjectParts, projectId, getProjectParts, sequenceNumber]);

  if (!items || items.length === 0) {
    return null;
  }

  return <MultipleSelectField {...selectFieldProps} items={items} />;
};
