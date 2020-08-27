import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import includes from 'lodash/includes';
import { Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { ROUTE } from '#/@store/router';

import SelectTaskType from './select-task-type';

import { INotification } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
}));

export interface IDialogHeaderProps {
  archiveTask: any;
  isPage;
  handleClose;
  projectId: number;
  sequenceNumber: number;
  showSuccess: (args: INotification) => any;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = ({
  archiveTask,
  isPage,
  handleClose,
  projectId,
  sequenceNumber,
  showSuccess,
}) => {
  /** show copy block */
  const [isShownCopy, setIsShowCopy] = useState(false);
  const showCopy = useCallback(() => {
    setIsShowCopy(true);
  }, [setIsShowCopy]);
  const hideCopy = useCallback(() => {
    setIsShowCopy(false);
  }, [setIsShowCopy]);
  /** end show copy block */

  const getLink = useCallback(
    (absolute: boolean = false) => {
      const path = ROUTE.PROJECT.TASK.ONE(projectId, sequenceNumber);
      if (absolute) {
        const port = includes(['443', '80', ''], window.location.port)
          ? window.location.port
          : ':' + window.location.port;
        return window.location.protocol + '//' + window.location.hostname + port + path;
      }
      return path;
    },
    [projectId, sequenceNumber]
  );

  const copyToClipboard = useCallback(
    (link: string) => {
      showSuccess({
        message: 'Ссылка на задачу скопирована в буфер обмена!',
        title: link,
      });
    },
    [showSuccess]
  );

  const goToTask = useCallback((link: string) => {
    window.open(link, '_blank');
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const moreMenuOpen = useCallback(
    (event: React.SyntheticEvent) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const moreMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  const onArchiveTask = useCallback(() => {
    archiveTask({ sequenceNumber, projectId });
    if (handleClose) {
      handleClose();
    }
  }, [archiveTask, handleClose, projectId, sequenceNumber]);

  const copyText = 'Скопировать ссылку на задачу';

  const { margin, row } = useStyles();

  return (
    <DialogTitle disableTypography>
      <div className={row}>
        <Field name="typeId" component={SelectTaskType} />
        {sequenceNumber && (
          <div onMouseLeave={hideCopy} onMouseOver={isPage ? undefined : showCopy}>
            <Tooltip title={isPage ? copyText : 'Открыть в отдельном окне'} placement="bottom">
              <CopyToClipboard text={getLink(true)} onCopy={isPage ? copyToClipboard : goToTask}>
                <Button variant="text">#{sequenceNumber}</Button>
              </CopyToClipboard>
            </Tooltip>
            {!isPage && isShownCopy && (
              <Tooltip title={copyText} placement="right">
                <CopyToClipboard text={getLink(true)} onCopy={copyToClipboard}>
                  <IconButton>
                    <FileCopyIcon fontSize="small" />
                  </IconButton>
                </CopyToClipboard>
              </Tooltip>
            )}
          </div>
        )}
      </div>
      <div>
        {sequenceNumber && (
          <>
            <IconButton aria-label="more" className={margin} onClick={moreMenuOpen}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={moreMenuClose}>
              <MenuItem onClick={onArchiveTask}>Архивировать задачу</MenuItem>
            </Menu>
          </>
        )}
        <IconButton onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </DialogTitle>
  );
};
