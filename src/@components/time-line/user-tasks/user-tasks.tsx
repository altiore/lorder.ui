import React, { useCallback, useEffect, useState } from 'react';
import Popover from 'react-popover';

import cn from 'classnames';
import get from 'lodash/get';
import moment from 'moment';

import grey from '@material-ui/core/colors/grey';
import { makeStyles, Theme } from '@material-ui/core/styles';

import HoverInfo from './hover-info';

import { IEvent } from '@types';

let leaveTimer: any = null;

interface IProps {
  editedEvent?: IEvent;
  events: IEvent[];
  getPosition: (time: moment.Moment | null) => number;
  height: number;
  setEditedEvent: (task: IEvent | undefined) => void;
  Y_HEIGHT_BIG: number;
}

export const UserTasks: React.FC<IProps> = ({
  editedEvent,
  events,
  getPosition,
  height,
  setEditedEvent,
  Y_HEIGHT_BIG,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<IEvent>();
  const [hoveredEl, setHoveredEl] = useState<any>(null);
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

  useEffect(() => {
    return () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
      }
    };
  }, []);

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

  const { block, blockActive, editedStyle, popover } = useStyles();
  return (
    <>
      {events.map(taskInfo => {
        return (
          <Popover
            key={taskInfo.userWork.id}
            preferPlace="below"
            tipSize={0.01}
            className={popover}
            isOpen={get(hoveredEvent, 'userWork.id') === taskInfo.userWork.id && !!hoveredEvent}
            target={hoveredEl as any}
            onOuterAction={handlePopoverClose}
            body={<HoverInfo onOver={handleHover} onLeave={handlePopoverClose} hoveredEvent={taskInfo} />}
          >
            <div
              aria-owns={`popover-body-${taskInfo.userWork.id}`}
              data-id={taskInfo.userWork.id}
              className={cn(block, {
                [editedStyle]: editedEvent?.userWork?.id === taskInfo.userWork.id,
                [blockActive]: taskInfo.isActive,
              })}
              style={{
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

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes ActiveWave': {
    '0%': {
      boxShadow: '0 8px 10px rgba(255, 199, 0, 0.3), 0 0 0 0 rgba(255, 191, 0, 0.2), 0 0 0 0 rgba(252, 209, 56, 0.2)',
    },
    '40%': {
      boxShadow:
        '0 8px 10px rgba(255, 199, 0, 0.3), 0 0 0 15px rgba(255, 191, 0, 0.2), 0 0 0 0 rgba(252, 209, 56, 0.2)',
    },
    '80%': {
      boxShadow:
        '0 8px 10px rgba(255, 199, 0, 0.3), 0 0 0 30px rgba(255, 191, 0, 0), 0 0 0 26.7px rgba(252, 209, 56, 0.07)',
    },
    '99%': {
      boxShadow: '0 8px 10px rgba(255, 199, 0, 0.3), 0 0 0 30px rgba(255, 191, 0, 0), 0 0 0 40px rgba(252, 209, 56, 0)',
    },
  },
  block: {
    backgroundColor: '#D5D5D5',
    borderColor: grey[400],
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    boxSizing: 'border-box',
    height: '100%',
    position: 'absolute',
  },
  blockActive: {
    backgroundColor: '#FFF0B5',
    borderColor: '#FFB200',
    borderRadius: 4,
    borderStyle: 'solid',
  },
  editedStyle: {
    animation: '$ActiveWave 1.2s linear infinite',
    borderBottomWidth: 2,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 2,
    boxShadow: theme.shadow.secondary,
    zIndex: 1400,
  },
  popover: {
    zIndex: 1300,
  },
}));
