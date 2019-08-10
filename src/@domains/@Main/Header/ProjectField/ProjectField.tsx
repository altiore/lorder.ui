import React, { memo } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { useStyles } from './styles';

export interface IProjectFieldProps {
  getValue?: (value: any) => any;
  getLabel?: (value: any) => any;
  items?: Array<{ value: any; label: string }>;
  onClick: (el: any) => any;
  onOpenInNew: (el: any) => any;
}

export const ProjectFieldJsx: React.FC<IProjectFieldProps> = memo(
  ({ getLabel, getValue, items, onClick, onOpenInNew }) => {
    const classes = useStyles();

    return (
      <React.Fragment>
        {(items as any).map((item: any) => {
          const value = (getValue as any)(item);
          const label = (getLabel as any)(item);
          return (
            <MenuItem key={item.id} value={value} onClick={onClick(value)} className={classes.item}>
              <span className={classes.row}>
                <IconButton color="secondary">
                  <DoneIcon />
                </IconButton>
                <Typography color="secondary">{label}</Typography>
              </span>
              <IconButton color="secondary" onClick={onOpenInNew(item)}>
                <OpenInNewIcon />
              </IconButton>
            </MenuItem>
          );
        })}
      </React.Fragment>
    );
  }
);

ProjectFieldJsx.defaultProps = {
  getLabel: (item: any) => item.title,
  getValue: (item: any) => item.id,
  items: [],
};
