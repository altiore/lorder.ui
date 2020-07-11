import React, { useCallback, useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { TextField } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { useStyles } from './style';

import { IUser } from '@types';

interface ITaskCommentsProps {
  addTaskComment: (projectId: number, taskId: number, comment: string) => Promise<IComment>;
  userId: number;
  removeTaskComment: (projectId: number, taskId: number, commentId: number) => Promise<number>;
  sequenceNumber: number;
  getTaskIdBySequenceNumber: (sequenceNumber: number, projectId: number) => number;
  projectId: number;
  fetchTaskComments: (projectId: number, taskId: number) => Promise<IComment[]>;
}

interface IComment {
  createdAt: string;
  id: number;
  taskId: number;
  text: string;
  updatedAt: string;
  user: IUser;
  userId: number;
}

export const TaskComments = ({
  addTaskComment,
  userId,
  removeTaskComment,
  sequenceNumber,
  getTaskIdBySequenceNumber,
  projectId,
  fetchTaskComments,
}: ITaskCommentsProps) => {
  const [currentSequenceNumber] = useState(sequenceNumber);
  const [taskComments, setTaskComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isCommentAdd, setIsCommentAdd] = useState(false);
  const [isCommentRemove, setIsCommentRemove] = useState(false);
  const [removedCommentId, setRemovedCommentId] = useState(-1);

  useEffect(() => {
    if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
      fetchTaskComments(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId)).then(
        (comments: IComment[]) => {
          setIsFetching(false);
          setTaskComments(comments as any);
        }
      );
    }
  }, [currentSequenceNumber, fetchTaskComments, getTaskIdBySequenceNumber, projectId, isFetching]);

  const removeComment = commentId => () => {
    setIsCommentRemove(true);
    setRemovedCommentId(commentId);
    removeTaskComment(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId), commentId).then(
      removedId => {
        setTaskComments(taskComments.filter((comm: IComment) => comm.id !== removedId));
        setRemovedCommentId(-1);
        setIsCommentRemove(false);
      }
    );
  };

  const classes = useStyles();
  const handleInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(value);
  };
  const handleAddTaskComment = useCallback(() => {
    if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
      setIsCommentAdd(true);
      addTaskComment(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId), commentInput).then(
        newComment => {
          setTaskComments([...taskComments, newComment] as any);
          setCommentInput('');
          setIsCommentAdd(false);
        }
      );
    }
  }, [currentSequenceNumber, projectId, getTaskIdBySequenceNumber, addTaskComment, taskComments, commentInput]);
  if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
    return (
      <div className={classes.commentsWrap}>
        <h2 style={{ textAlign: 'center' }}>Комментарии</h2>
        <Divider />
        {isFetching && !taskComments.length ? (
          <div className={classes.circularWrap}>
            <CircularProgress />
          </div>
        ) : (
          taskComments.map((comment: IComment) => {
            return (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start" style={{ position: 'relative' }}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={comment.user.avatar?.url || process.env.PUBLIC_URL + '/d-avatar.png'}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user.displayName || 'N/A'}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                          {comment.text}
                        </Typography>
                        {userId === comment.user.id && (
                          <span className={classes.basketWrap}>
                            <Tooltip title="Удалить комментарий" placement="top-end">
                              <DeleteIcon className={classes.basketIcon} onClick={removeComment(comment.id)} />
                            </Tooltip>
                          </span>
                        )}
                        {isCommentRemove && comment.id === removedCommentId && (
                          <div className={classes.circularRemoveWrap}>
                            <CircularProgress />
                          </div>
                        )}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        )}
        {isCommentAdd && taskComments.length ? (
          <div className={classes.circularWrap}>
            <CircularProgress />
          </div>
        ) : null}
        <div className={classes.textareaWrap}>
          <TextField
            id="outlined-multiline-static"
            label="Оставьте комментарий"
            multiline
            rows={4}
            variant="filled"
            onChange={handleInput}
            value={commentInput}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={handleAddTaskComment as any}
            disabled={!Boolean(commentInput.trim().length)}
          >
            Отправить
          </Button>
        </div>
      </div>
    );
  }
  return null;
};
