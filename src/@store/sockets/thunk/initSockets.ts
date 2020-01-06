import openSocket from 'socket.io-client';

import { ITask } from '@types';

import { updateProjectTask } from '@store/tasks';
import { initSocketsAction, updateTaskAction } from '../actions';

export const socketTasks = openSocket(`${process.env.REACT_APP_API_BASE_URL}/projects/tasks`);

export const initSockets = () => dispatch => {
  dispatch(initSocketsAction());
  socketTasks.on('connect', function() {
    console.log('Connected!');
  });
  socketTasks.on('taskUpdated', function(task: ITask) {
    dispatch(updateTaskAction(task.title));
    dispatch(updateProjectTask(task));
  });
  socketTasks.on('joinParticipantProjectRoom', function(projectId) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Client was join to Room' + projectId);
    }
  });
  socketTasks.on('leaveAllRooms', function() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Client left all wss rooms!');
    }
  });
  socketTasks.on('exception', function(data) {
    if (process.env.NODE_ENV === 'development') {
      console.log('exception', data);
    }
  });
  socketTasks.on('disconnect', function() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Disconnected');
    }
  });
};
