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

const formatNumber = i => (typeof i === 'number' ? i.toString() : '');

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

const NUMBER_FIELDS = ['userValue', 'userValueFinal'];
const TASK_ESTIMATION_FIELDS = ['urgency', 'complexity', ...NUMBER_FIELDS];

const MAP_FIELD_TO_ITEMS = {
  complexity: COMPLEXITY,
  urgency: URGENCY,
};

const MAP_COMPONENT = {
  complexity: SelectField,
  urgency: SelectField,
  userValue: InputField,
  userValueFinal: InputField,
};

const MAP_LABEL = {
  complexity: 'Сложность',
  urgency: 'Важность',
  userValue: 'Ценность',
  userValueFinal: 'Пост-ценность',
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
      <Field name="value" component={ValueField} label="Оценка задачи" size={SIZE.LARGE} />
      {allowedFields.map(field => (
        <Field
          key={field}
          name={field}
          component={MAP_COMPONENT[field]}
          label={MAP_LABEL[field]}
          items={MAP_FIELD_TO_ITEMS[field]}
          parse={NUMBER_FIELDS.includes(field) ? parseNumber : undefined}
          format={NUMBER_FIELDS.includes(field) ? formatNumber : undefined}
          validate={required()}
        />
      ))}
    </div>
  );
};
