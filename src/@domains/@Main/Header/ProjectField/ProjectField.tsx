import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import React from 'react';

export interface IProjectFieldProps {
  classes: any;
  getValue?: (value: any) => any;
  getLabel?: (value: any) => any;
  items?: Array<{ value: any; label: string }>;
  onClick: (el: any) => any;
  onOpenInNew: (el: any) => any;
}

export const ProjectFieldJsx: React.FunctionComponent<IProjectFieldProps> = ({
  classes,
  getLabel = (item: any) => item.title,
  getValue = (item: any) => item.id,
  items = [],
  onClick,
  onOpenInNew,
}): any =>
  items.map((item: any) => (
    <MenuItem key={item.id} value={getValue(item)} onClick={onClick(getValue(item))} className={classes.item}>
      <span className={classes.row}>
        <IconButton color="secondary">
          <DoneIcon />
        </IconButton>
        <Typography color="secondary">{getLabel(item)}</Typography>
      </span>
      <IconButton color="secondary" onClick={onOpenInNew(item)}>
        <OpenInNewIcon />
      </IconButton>
    </MenuItem>
  ));
