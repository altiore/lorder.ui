import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Popover from 'react-popover';

import get from 'lodash/get';
import minBy from 'lodash/minBy';
import moment from 'moment';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Paper from '@material-ui/core/Paper';
import { Theme, useTheme } from '@material-ui/core/styles';

import EditWork from './EditWork';
import HoverInfo from './HoverInfo';
import { useStyles } from './styles';

import { IEvent } from '@types';

export interface IDailyRoutineProps {
  events: IEvent[];
  getRef: any;
  patchUserWork: (values: object) => Promise<any>;
  width: number;
}

export const Y_HEIGHT_BIG = 82;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 24;
const LABEL_HEIGHT = 12;

let heightTimer: any = null;
let updateInterval: any = null;
let leaveTimer: any = null;

export const TimeLineTsx: React.FC<IDailyRoutineProps> = ({ events, getRef, patchUserWork, width }) => {
  const getStartAt = useCallback((): number => {
    const current = moment();
    const first = minBy(events, (ev: IEvent) =>
      ev.userWork.startAt.day() === current.day() ? ev.userWork.startAt.hours() : 24
    );
    const hours = first ? first.userWork.startAt.hours() : 0;
    return first && hours < current.hours() ? hours : 0;
  }, [events]);

  const getFinishAt = useCallback((): number => {
    const hours = moment().hours();
    return hours < 24 ? (hours < 23 ? hours + 2 : hours + 1) : 24;
  }, []);

  const [startAt, setStartAt] = useState(getStartAt);
  const [finishAt, setFinishAt] = useState(getFinishAt);
  const [height, setHeight] = useState(Y_HEIGHT_LITTLE);
  const [hoveredEl, setHoveredEl] = useState<any>(null);
  const [hoveredEvent, setHoveredEvent] = useState<IEvent>();
  const [editedEvent, setEditedEvent] = useState<IEvent>();

  const clearTimer = useCallback(() => {
    if (heightTimer) {
      clearInterval(heightTimer);
    }
  }, []);

  const decreaseHeightNow = useCallback(() => {
    if (!editedEvent) {
      clearTimer();
      setHeight(Y_HEIGHT_LITTLE);
    }
  }, [clearTimer, editedEvent]);

  const handleEditEventClose = useCallback(
    (e: any) => {
      const eventId = parseInt(get(e, ['target', 'dataset', 'id'], 0), 0);
      if (!eventId) {
        setEditedEvent(undefined);
      }
    },
    [setEditedEvent]
  );

  const increaseHeight = useCallback(
    (e?: React.SyntheticEvent) => {
      if (e) {
        e.stopPropagation();
      }
      setHeight(Y_HEIGHT_BIG);
      clearTimer();
    },
    [clearTimer, setHeight]
  );

  const handleMouseEnter = useCallback(() => {
    clearTimer();
    heightTimer = setTimeout(() => {
      increaseHeight();
    }, 500);
  }, [clearTimer, increaseHeight]);

  const decreaseHeight = useCallback(() => {
    if (!editedEvent) {
      clearTimer();
      heightTimer = setTimeout(() => {
        setHeight(Y_HEIGHT_LITTLE);
        clearTimer();
      }, 10000);
    }
  }, [clearTimer, editedEvent, setHeight]);

  const handlePopoverClose = useCallback(() => {
    leaveTimer = setTimeout(() => {
      setHoveredEl(null);
      setHoveredEvent(undefined);
    }, 500);
  }, [setHoveredEl, setHoveredEvent]);

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

  const getStyle = useCallback((el: IEvent) => {
    if (el.isActive) {
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

  const svgWidth = useMemo(() => {
    return width - 2 * X_OFFSET;
  }, [width]);

  const getHours = useCallback(
    (el?: moment.Moment | null) => {
      const current = moment();
      return el
        ? el.day() === current.day()
          ? el.hours() + el.minutes() / 60
          : startAt
        : current.hours() + current.minutes() / 60;
    },
    [startAt]
  );

  const getPosition = useCallback(
    (el?: moment.Moment | null) => {
      const res = ((getHours(el) - startAt) * svgWidth) / (finishAt - startAt);
      return res >= 0 ? res + X_OFFSET : X_OFFSET;
    },
    [finishAt, getHours, startAt, svgWidth]
  );

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
    [editedEvent, events, height, setEditedEvent, setHoveredEvent]
  );

  const getLines = useCallback(() => {
    const parts = (finishAt - startAt) * 4;
    if (parts <= 0) {
      return [];
    }
    const step = svgWidth / parts;
    const arr = new Array(parts).fill(0).map((_, i) => ({
      isHour: !(i % 4),
      label: !(i % 4) && `${Math.ceil(i / 4 + startAt)}`,
      x: step * i,
    }));
    arr.push({ x: svgWidth, isHour: true, label: `${finishAt}` });
    return arr;
  }, [finishAt, startAt, svgWidth]);

  useEffect(() => {
    updateInterval = setInterval(() => {
      setStartAt(getStartAt());
      setFinishAt(getFinishAt());
    }, 600000);
    return () => {
      if (heightTimer) {
        clearTimeout(heightTimer);
      }
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [getFinishAt, getStartAt, setStartAt]);

  const classes = useStyles();
  const theme: Theme = useTheme();

  const preparedEvents = useMemo(() => {
    return events.filter((el: IEvent) => {
      return (
        !el.userWork.finishAt ||
        (el.userWork.finishAt.day() === moment().day() && getHours(el.userWork.finishAt) > startAt)
      );
    });
  }, [events, getHours, startAt]);

  const isExpended = useMemo(() => height === Y_HEIGHT_BIG, [height]);

  const formInitialValues = useMemo(() => {
    return {
      ...get(editedEvent, ['userWork']),
      projectId: get(editedEvent, ['userWork', 'projectId'], get(editedEvent, ['task', 'projectId'])),
    };
  }, [editedEvent]);

  return (
    <ClickAwayListener onClickAway={decreaseHeightNow}>
      <Popover
        style={{ zIndex: 1 }}
        preferPlace="below"
        isOpen={Boolean(editedEvent)}
        tipSize={0.01}
        body={
          <Paper className={classes.popoverPaper}>
            <EditWork
              event={editedEvent}
              initialValues={formInitialValues}
              onClose={handleEditEventClose}
              patchUserWork={patchUserWork}
            />
          </Paper>
        }
      >
        <div
          ref={getRef}
          className={classes.root}
          style={{
            height,
            zIndex: isExpended ? 1200 : 0,
          }}
          onClick={isExpended ? undefined : increaseHeight}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={decreaseHeight}
        >
          <div
            className={classes.filled}
            style={{
              boxShadow: isExpended ? theme.shadows[1] : 'none',
              flexBasis: isExpended ? '76%' : '100%',
            }}
          >
            {preparedEvents.map((event, i) => {
              return (
                <Popover
                  key={event.userWork.id}
                  preferPlace="below"
                  tipSize={0.01}
                  className={classes.popover}
                  isOpen={get(hoveredEvent, 'userWork.id') === event.userWork.id && !!hoveredEvent}
                  target={hoveredEl as any}
                  onOuterAction={handlePopoverClose}
                  body={<HoverInfo onOver={handleHover} onLeave={handlePopoverClose} hoveredEvent={event} />}
                >
                  <div
                    aria-owns={`popover-body-${event.userWork.id}`}
                    data-id={event.userWork.id}
                    className={classes.block}
                    style={{
                      ...getStyle(event),
                      left: getPosition(event.userWork.startAt),
                      width: getWidth(event),
                    }}
                    onClick={handleEventClick}
                    onMouseOver={handleHover}
                    onMouseLeave={handlePopoverClose}
                  />
                </Popover>
              );
            })}
          </div>
          <svg height={height} width={width} className={classes.svg}>
            {getLines().map(({ x, isHour, label }) => (
              <React.Fragment key={x}>
                {label && height === Y_HEIGHT_BIG && (
                  <text x={x + X_OFFSET} y={LABEL_HEIGHT} className={classes.text}>
                    <tspan x={x + X_OFFSET} textAnchor="middle">
                      {label}
                      :00
                    </tspan>
                  </text>
                )}
                {isExpended && (
                  <line
                    // stroke="#FAB203"
                    stroke={orange[300]}
                    x1={x + X_OFFSET}
                    y1={LABEL_HEIGHT + 2}
                    x2={x + X_OFFSET}
                    y2={LABEL_HEIGHT + 8}
                  />
                )}
              </React.Fragment>
            ))}
          </svg>
        </div>
      </Popover>
    </ClickAwayListener>
  );
};
