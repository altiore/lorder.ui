import React, { useMemo } from 'react';

import intersection from 'lodash/intersection';
import { Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';

import { SelectField } from '@components/SelectField';

import { ITaskMove, TASK_STATUS_MOVE_TYPE } from '@types';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 152,
    overflow: 'hidden',
    paddingTop: 6,
  },
}));

export interface IDurationAdditionalField {
  getMovesByStatus: (projectId: number, status: string) => ITaskMove[];
  projectId?: number;
  statusTypeName?: string;
}

const TASK_ESTIMATION_FIELDS = ['complexity'];

enum COMPLEXITY_NAME {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
  ARCHITECT = 'ARCHITECT',
  DISCUSSION = 'DISCUSSION',
  COMMUNITY = 'COMMUNITY',
}

const MAP_FIELD_TO_ITEMS = {
  complexity: COMPLEXITY_NAME,
};

const MAP_LABEL = {
  complexity: 'Сложность',
};

export const DurationAdditionalField: React.FC<IDurationAdditionalField> = ({
  getMovesByStatus,
  projectId,
  statusTypeName,
}) => {
  const moves = useMemo(() => {
    if (getMovesByStatus && projectId && statusTypeName) {
      return getMovesByStatus(projectId, statusTypeName);
    }
  }, [getMovesByStatus, projectId, statusTypeName]);

  const requiredFields = useMemo(() => {
    const pushForwardMove = moves && moves.find(m => m.type === TASK_STATUS_MOVE_TYPE.PUSH_FORWARD);
    if (pushForwardMove && pushForwardMove.requirements && pushForwardMove.requirements.fields) {
      return pushForwardMove.requirements.fields;
    }
    return [];
  }, [moves]);

  const allowedFields = useMemo(() => intersection(requiredFields, TASK_ESTIMATION_FIELDS), [requiredFields]);

  const { root } = useStyles();

  if (!statusTypeName || !projectId || !allowedFields || !allowedFields.length) {
    return null;
  }

  return (
    <div className={root}>
      {allowedFields.map(field => (
        <Field
          key={field}
          name={field}
          component={SelectField}
          label={MAP_LABEL[field]}
          items={MAP_FIELD_TO_ITEMS[field]}
        />
      ))}
    </div>
  );
};
