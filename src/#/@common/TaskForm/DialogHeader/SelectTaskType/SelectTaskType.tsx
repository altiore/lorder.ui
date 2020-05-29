import React, { useCallback } from 'react';

import get from 'lodash/get';
import { WrappedFieldProps } from 'redux-form';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TypeIcon from '#/@common/TypeIcon';

import { IProjectTaskType } from '@types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
      maxHeight: 200,
      maxWidth: 100,
      overflow: 'auto',
      position: 'relative',
      width: '100%',
      ...theme.mainContent.scroll,
    },
    root: {
      padding: theme.spacing(0, 0.25, 1, 0),
    },
  })
);

interface ISelectTaskType extends WrappedFieldProps {
  items: IProjectTaskType[];
}

export const SelectTaskType: React.FC<ISelectTaskType> = ({ input, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (items && items.length) {
        setAnchorEl(event.currentTarget);
      }
    },
    [items, setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const { onChange } = input;

  const handleSelectType = useCallback(
    event => {
      if (onChange) {
        const selectedTaskId = parseInt(get(event, ['currentTarget', 'dataset', 'id']), 0);
        if (typeof selectedTaskId === 'number') {
          onChange(selectedTaskId);
        }
      }
      handleClose();
    },
    [handleClose, onChange]
  );

  const { list, root } = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'task-type-select-popover' : undefined;
  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <TypeIcon typeId={input.value} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ className: root }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <List dense className={list}>
          {items &&
            items.map(({ taskTypeId }) => (
              <ListItem data-id={taskTypeId} onClick={handleSelectType} button key={`item-${taskTypeId}`}>
                <TypeIcon typeId={taskTypeId} />
              </ListItem>
            ))}
        </List>
      </Popover>
    </div>
  );
};
