import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import get from 'lodash/get';
import moment from 'moment';

import grey from '@material-ui/core/colors/grey';

import HoverInfo from '../hover-info';
import { useStyles } from '../styles';

import { IEvent } from '@types';
let leaveTimer: any = null;

interface IUsersTask {
  events: IEvent[];
  getPosition: (time: moment.Moment | null) => number;
  getHours: (time: moment.Moment) => any;
  startAt: number;
  editedEvent: any;
  setEditedEvent: (task: IEvent | undefined) => void;
  Y_HEIGHT_BIG: number;
  height: number;
}

export const UserTasks: React.FC<IUsersTask> = ({
  getPosition,
  getHours,
  startAt,
  events,
  editedEvent,
  setEditedEvent,
  height,
  Y_HEIGHT_BIG,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<IEvent>();
  const [hoveredEl, setHoveredEl] = useState<any>(null);
  const preparedEvents = useMemo(() => {
    return events.filter((el: IEvent) => {
      return (
        !el.userWork.finishAt ||
        (el.userWork.finishAt.day() === moment().day() && getHours(el.userWork.finishAt) > startAt)
      );
    });
  }, [events, getHours, startAt]);
  const cleanLeaveTimer = useCallback(() => {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
    }
  }, []);

  const handleHover = useCallback(
    (e: React.SyntheticEvent) => {
      const eventId = parseInt(get(e, ['target', 'dataset', 'id'], 0), 0);
      const newHoveredEvent = events.find(el => get(el, ['userWork', 'id']) === eventId);

      cleanLeaveTimer();
      setHoveredEl(e.currentTarget);
      if (!editedEvent && newHoveredEvent) {
        setHoveredEvent(newHoveredEvent);
      } else {
        setHoveredEvent(undefined);
      }
    },
    [cleanLeaveTimer, editedEvent, events]
  );

  const handlePopoverClose = useCallback(() => {
    leaveTimer = setTimeout(() => {
      setHoveredEl(null);
      setHoveredEvent(undefined);
    }, 500);

    return () => {
      clearTimeout(leaveTimer);
    };
  }, [setHoveredEl, setHoveredEvent]);

  const getWidth = useCallback(
    (el: IEvent) => {
      return getPosition(el.userWork.finishAt) - getPosition(el.userWork.startAt);
    },
    [getPosition]
  );

  const handleEventClick = useCallback(
    (e: React.SyntheticEvent) => {
      const eventId = parseInt(get(e, ['target', 'dataset', 'id'], 0), 0);
      if (height === Y_HEIGHT_BIG) {
        e.stopPropagation();
        if (eventId === get(editedEvent, ['userWork', 'id'])) {
          setEditedEvent(undefined);
        } else {
          const newEditEvent = events.find(el => get(el, ['userWork', 'id']) === eventId);
          if (newEditEvent) {
            setEditedEvent(newEditEvent);
            setHoveredEvent(undefined);
          }
        }
      }
    },
    [editedEvent, events, height, setEditedEvent, setHoveredEvent, Y_HEIGHT_BIG]
  );

  const classes = useStyles();
  const getStyle = useCallback((taskInfo: IEvent) => {
    if (taskInfo.isActive) {
      return {
        backgroundColor: '#FFF0B5',
        borderBottomWidth: 1,
        borderColor: '#FFB200',
        borderLeftWidth: 2,
        borderRadius: 4,
        borderRightWidth: 2,
        borderStyle: 'solid',
        borderTopWidth: 1,
      };
    }
    return {
      backgroundColor: '#D5D5D5',
      borderColor: grey[400],
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
    };
  }, []);

  return (
    <>
      {preparedEvents.map((taskInfo, i) => {
        return (
          <Popover
            key={taskInfo.userWork.id}
            preferPlace="below"
            tipSize={0.01}
            className={classes.popover}
            isOpen={get(hoveredEvent, 'userWork.id') === taskInfo.userWork.id && !!hoveredEvent}
            target={hoveredEl as any}
            onOuterAction={handlePopoverClose}
            body={<HoverInfo onOver={handleHover} onLeave={handlePopoverClose} hoveredEvent={taskInfo} />}
          >
            <div
              aria-owns={`popover-body-${taskInfo.userWork.id}`}
              data-id={taskInfo.userWork.id}
              className={classes.block}
              style={{
                ...getStyle(taskInfo),
                left: getPosition(taskInfo.userWork.startAt),
                width: getWidth(taskInfo),
              }}
              onClick={handleEventClick}
              onMouseOver={handleHover}
              onMouseLeave={handlePopoverClose}
            />
          </Popover>
        );
      })}
    </>
  );
};
