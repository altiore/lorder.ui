import React, { useMemo } from 'react';

import intersection from 'lodash/intersection';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';

import { makeStyles } from '@material-ui/core/styles';

import InputField from '@components/InputField';
import { SelectField } from '@components/SelectField';
import ValueField from '@components/value-field';
import { SIZE } from '@components/value/value';

import { parseNumber } from '#/@store/@common/helpers';

import { COMPLEXITY, ITaskMove, PROJECT_STRATEGY, TASK_STATUS_MOVE_TYPE, URGENCY } from '@types';

const useStyles = makeStyles(() => ({
  inputStyle: {
    '& > input': {
      minWidth: 'unset',
    },
  },
  root: {
    maxWidth: 152,
    overflow: 'hidden',
    paddingTop: 6,
  },
}));

export interface IProps {
  getMovesByStatus: (projectId: number, status: string) => ITaskMove[];
  projectId?: number;
  statusTypeName?: string;
  strategy?: PROJECT_STRATEGY;
}

const TASK_ESTIMATION_FIELDS = ['urgency', 'complexity'];

const MAP_FIELD_TO_ITEMS = {
  complexity: COMPLEXITY,
  urgency: URGENCY,
};

const MAP_LABEL = {
  complexity: 'Сложность',
  urgency: 'Важность',
};

export const EstimationField: React.FC<IProps> = ({ getMovesByStatus, projectId, statusTypeName, strategy }) => {
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

  const { inputStyle, root } = useStyles();

  if (!statusTypeName || !projectId) {
    return null;
  }

  if (!allowedFields || !allowedFields.length) {
    if (strategy === PROJECT_STRATEGY.SIMPLE) {
      return (
        <div>
          <Field
            name="value"
            className={inputStyle}
            component={InputField}
            parse={parseNumber}
            label="Оценка задачи"
            type="number"
          />
        </div>
      );
    } else {
      return (
        <div>
          <Field name="value" component={ValueField} label="Оценка задачи" size={SIZE.LARGE} />
        </div>
      );
    }
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
          validate={required()}
        />
      ))}
    </div>
  );
};
