import React, { useEffect, useMemo } from 'react';

import { IMultiSelectField, MultipleSelectField } from '@components/MultiSelectField/MultiSelectField';

import { IProjectPart } from '@types';

interface IProjectPartsField extends IMultiSelectField {
  fetchProjectParts: any;
  getTaskProjectParts: (p: number, sn: number) => IProjectPart[];
  projectId: number;
  projectParts: IProjectPart[];
  sequenceNumber: number;
}

export const ProjectPartsFieldTsx: React.FC<IProjectPartsField> = props => {
  const {
    fetchProjectParts,
    getTaskProjectParts,
    projectId,
    projectParts,
    sequenceNumber,
    ...selectFieldProps
  } = props;

  useEffect(() => {
    if (fetchProjectParts) {
      fetchProjectParts(projectId);
    }
  }, [fetchProjectParts, projectId]);

  const items = useMemo(() => {
    if (projectParts && projectParts.length) {
      return projectParts;
    }
    return getTaskProjectParts(projectId, sequenceNumber) || [];
  }, [getTaskProjectParts, projectId, projectParts, sequenceNumber]);

  if (!items || items.length === 0) {
    return null;
  }

  return <MultipleSelectField {...selectFieldProps} items={items} />;
};
