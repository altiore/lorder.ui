import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Popover from 'react-popover';

import get from 'lodash/get';
import minBy from 'lodash/minBy';
import moment from 'moment';

import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Paper from '@material-ui/core/Paper';
import { Theme, useTheme } from '@material-ui/core/styles';

import CurrentTimeIndicator from './CurrentTimeIndicator/CurrentTimeIndicator';
import EditWork from './EditWork';
import HoverInfo from './HoverInfo';
import { useStyles } from './styles';

import { IEvent } from '@types';

export interface IDailyRoutineProps {
  events: IEvent[];
  getRef: any;
  patchUserWork: (values: object) => Promise<any>;
  width: number;
  onTimelineClick: () => void;
  fullSize?: boolean;
}

export const Y_HEIGHT_BIG = 65;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 24;
const LABEL_HEIGHT = 12;

const heightTimer: any = null;
let updateInterval: any = null;
let leaveTimer: any = null;

const timelineStub = () => null;

export const TimeLineTsx: React.FC<IDailyRoutineProps> = ({
  events,
  getRef,
  patchUserWork,
  width,
  onTimelineClick = timelineStub,
  fullSize,
}) => {
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
  const [height] = useState(fullSize ? Y_HEIGHT_BIG : Y_HEIGHT_LITTLE);
  const [hoveredEl, setHoveredEl] = useState<any>(null);
  const [hoveredEvent, setHoveredEvent] = useState<IEvent>();
  const [editedEvent, setEditedEvent] = useState<IEvent>();

  const handleEditEventClose = useCallback(
    (e: any) => {
      const eventId = parseInt(get(e, ['target', 'dataset', 'id'], 0), 0);
      if (!eventId) {
        setEditedEvent(undefined);
      }
    },
    [setEditedEvent]
  );
  const handleClick = useCallback(() => {
    if (!fullSize) {
      onTimelineClick();
    }
  }, [fullSize, onTimelineClick]);

  const handlePopoverClose = useCallback(() => {
    leaveTimer = setTimeout(() => {
      setHoveredEl(null);
      setHoveredEvent(undefined);
    }, 500);

    return () => {
      clearTimeout(leaveTimer);
    };
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
    (time?: moment.Moment | null) => {
      const res = ((getHours(time) - startAt) * svgWidth) / (finishAt - startAt);
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
    // Узнаем разницу между текущим моментом и моментом начала задачи
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
    <Popover
      style={{ zIndex: 1400 }}
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
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <CurrentTimeIndicator fullSize={fullSize} left={getPosition(moment())} />

        <div
          ref={getRef}
          className={classes.root}
          style={{
            height,
            zIndex: isExpended ? 1200 : 0,
          }}
          onClick={handleClick}
        >
          <div
            className={classes.filled}
            style={{
              boxShadow: isExpended ? theme.shadows[1] : 'none',
              flexBasis: isExpended ? '76%' : '100%',
            }}
          >
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
          </div>
          <svg height={fullSize ? 80 : height} width={width} className={classes.svg}>
            {getLines().map(({ x, isHour, label }) => (
              <React.Fragment key={x}>
                {label && height === Y_HEIGHT_BIG && (
                  <text x={x + X_OFFSET} y={10} className={classes.text}>
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
                    y1={LABEL_HEIGHT + 6}
                    x2={x + X_OFFSET}
                    y2={LABEL_HEIGHT - 4}
                  />
                )}
              </React.Fragment>
            ))}
          </svg>
        </div>
      </div>
    </Popover>
  );
};
