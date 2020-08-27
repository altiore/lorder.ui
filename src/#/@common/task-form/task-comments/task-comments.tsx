import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { useStyles } from './style';

import { ITask, IUser } from '@types';

interface IProps {
  addTaskComment: (projectId: number, taskId: number, comment: string) => Promise<IComment>;
  fetchTaskComments: (projectId: number, taskId: number) => Promise<IComment[]>;
  getTaskBySequenceNumber: (sequenceNumber: number, projectId: number) => undefined | ITask;
  projectId: number;
  removeTaskComment: (projectId: number, taskId: number, commentId: number) => Promise<number>;
  sequenceNumber: number;
  userId: number;
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

const DEF_COMMENTS = [];

export const TaskComments: React.FC<IProps> = ({
  addTaskComment,
  fetchTaskComments,
  getTaskBySequenceNumber,
  projectId,
  removeTaskComment,
  sequenceNumber,
  userId,
}) => {
  const [taskComments, setTaskComments] = useState<IComment[]>(DEF_COMMENTS);
  const [commentInput, setCommentInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isCommentAdd, setIsCommentAdd] = useState(false);
  const [isCommentRemove, setIsCommentRemove] = useState(false);
  const [removedCommentId, setRemovedCommentId] = useState(-1);

  const curTask = useMemo<ITask | undefined>(() => {
    return getTaskBySequenceNumber(sequenceNumber, projectId);
  }, [getTaskBySequenceNumber, projectId, sequenceNumber]);

  useEffect(() => {
    if (curTask && curTask.commentsCount) {
      setIsFetching(true);
      fetchTaskComments(curTask.projectId, curTask.id)
        .then((comments: IComment[]) => {
          setIsFetching(false);
          setTaskComments(comments);
        })
        .catch(() => {
          setIsFetching(false);
          setTaskComments(DEF_COMMENTS);
        });
    }
    return () => {
      setTaskComments(DEF_COMMENTS);
    };
  }, [curTask, fetchTaskComments]);

  const removeComment = useCallback(
    evt => {
      const commentId = parseInt(evt?.currentTarget?.dataset?.id, 0);
      if (commentId && curTask?.id) {
        setIsCommentRemove(true);
        setRemovedCommentId(commentId);
        removeTaskComment(curTask.projectId, curTask.id, commentId).then(removedId => {
          setTaskComments(taskComments.filter((comm: IComment) => comm.id !== removedId));
          setRemovedCommentId(-1);
          setIsCommentRemove(false);
        });
      }
    },
    [curTask, removeTaskComment, taskComments]
  );

  const classes = useStyles();
  const handleInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(value);
  };
  const handleAddTaskComment = useCallback(() => {
    if (curTask?.id) {
      setIsCommentAdd(true);
      addTaskComment(projectId, curTask.id, commentInput).then(newComment => {
        setTaskComments([...taskComments, newComment] as any);
        setCommentInput('');
        setIsCommentAdd(false);
      });
    }
  }, [curTask, projectId, addTaskComment, taskComments, commentInput]);

  if (!curTask?.id) {
    return null;
  }

  return (
    <div className={classes.commentsWrap}>
      <h2 style={{ textAlign: 'center' }}>Комментарии</h2>
      <Divider />
      {isFetching ? (
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
                    src={comment?.user?.avatar?.url || process.env.PUBLIC_URL + '/d-avatar.png'}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment?.user?.displayName || 'N/A'}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                        {comment.text}
                      </Typography>
                      {userId === comment.userId && (
                        <span className={classes.basketWrap}>
                          <Tooltip title="Удалить комментарий" placement="top-end">
                            <DeleteIcon className={classes.basketIcon} data-id={comment.id} onClick={removeComment} />
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
      {Boolean(isCommentAdd && taskComments.length) && (
        <div className={classes.circularWrap}>
          <CircularProgress />
        </div>
      )}
      <div className={classes.textareaWrap}>
        <TextField
          id="comment-multiline"
          label="Оставьте комментарий"
          multiline
          rows={4}
          variant="filled"
          onChange={handleInput}
          value={commentInput}
          fullWidth
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
};
