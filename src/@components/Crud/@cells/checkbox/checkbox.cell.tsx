import React, { useCallback, useMemo } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const CheckboxCell: React.FC<any> = ({ editable, name, onChange, value }) => {
  const labelValue = useMemo(() => (value ? 'Да' : 'Нет'), [value]);

  const handleClick = useCallback(e => {
    e.stopPropagation();
  }, []);

  if (!editable) {
    return <span>{labelValue}</span>;
  }

  return (
    <FormControlLabel
      onClick={handleClick}
      name={name}
      checked={value}
      onChange={onChange}
      control={<Checkbox size="small" color="primary" />}
      label={name}
    />
  );
};
