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
import { Delete as DeleteIcon } from '@material-ui/icons';

import { useStyles } from './style';

export const TaskComments = ({
  addTaskComment,
  userId,
  removeTaskComment,
  sequenceNumber,
  getTaskIdBySequenceNumber,
  projectId,
  fetchTaskComments,
}: any) => {
  const [currentSequenceNumber] = useState(sequenceNumber);
  const [taskComments, setTaskComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
      fetchTaskComments(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId)).then(setTaskComments);
    }
  }, [currentSequenceNumber, fetchTaskComments, getTaskIdBySequenceNumber, projectId]);

  const removeComment = commentId => () => {
    removeTaskComment(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId), commentId).then(
      removedCommentId => {
        setTaskComments(taskComments.filter((comm: any) => comm.id !== removedCommentId));
      }
    );
  };

  const classes = useStyles();
  const handleInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(value);
  };

  const handleAddTaskComment = useCallback(() => {
    if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
      addTaskComment(projectId, getTaskIdBySequenceNumber(currentSequenceNumber, projectId), commentInput).then(
        newComment => {
          setTaskComments([...taskComments, newComment] as any);
          setCommentInput('');
        }
      );
    }
  }, [currentSequenceNumber, projectId, getTaskIdBySequenceNumber, addTaskComment, taskComments, commentInput]);
  if (getTaskIdBySequenceNumber(currentSequenceNumber, projectId)) {
    return (
      <div style={{ maxWidth: '75%' }}>
        <h2 style={{ textAlign: 'center' }}>Комментарии</h2>
        <Divider />
        {taskComments.map((comment: any) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start" style={{ position: 'relative' }}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={comment.user.avatar.url || process.env.PUBLIC_URL + '/d-avatar.png'} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.displayName || 'N/A'}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                      {comment.text}
                    </Typography>
                    {userId === comment.user.id && (
                      <span style={{ position: 'absolute', right: 4, top: 4 }}>
                        <Tooltip title="Удалить комментарий" placement="left-start">
                          <DeleteIcon className={classes.basketIcon} onClick={removeComment(comment.id)} />
                        </Tooltip>
                      </span>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
        <div style={{ marginTop: 20, marginBottom: 20, background: 'transparent' }}>
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
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="contained"
            color="primary"
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
