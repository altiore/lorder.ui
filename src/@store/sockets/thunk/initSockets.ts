import openSocket from 'socket.io-client';

import { ITask } from '@types';

import { initSocketsAction, updateTaskAction } from '../actions';

export const socketTasks = openSocket(`${process.env.REACT_APP_API_BASE_URL}/projects/tasks`);

export const initSockets = () => dispatch => {
  dispatch(initSocketsAction());
  socketTasks.on('connect', function() {
    console.log('Connected');
  });
  socketTasks.on('taskUpdated', function(task: ITask) {
    dispatch(updateTaskAction(task.title));
    console.log('Updated Task from server is:', task);
  });
  socketTasks.on('joinParticipantProjectRoom', function(projectId) {
    console.log('Client was join to Room' + projectId);
  });
  socketTasks.on('leaveAllRooms', function() {
    console.log('Client left all wss rooms!');
  });
  socketTasks.on('exception', function(data) {
    console.log('exception', data);
  });
  socketTasks.on('disconnect', function() {
    console.log('Disconnected');
  });
};
