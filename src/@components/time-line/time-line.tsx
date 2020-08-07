import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Popover from 'react-popover';

import get from 'lodash/get';
import minBy from 'lodash/minBy';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import { Theme, useTheme } from '@material-ui/core/styles';

import CurrentTimeIndicator from './current-time-indicator/current-time-indicator';
import EditWork from './edit-work';
import { useStyles } from './styles';
import { SvgTimeScale } from './svg-time-scale/svg-time-scale';
import { UserTasks } from './user-tasks/user-tasks';

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
let updateInterval: any = null;

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

  useEffect(() => {
    updateInterval = setInterval(() => {
      setStartAt(getStartAt());
      setFinishAt(getFinishAt());
    }, 600000);
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [getFinishAt, getStartAt, setStartAt]);

  const classes = useStyles();
  const theme: Theme = useTheme();

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
      <div className={classes.rootWrap} onClick={handleClick}>
        <CurrentTimeIndicator fullSize={fullSize} left={getPosition(moment())} />
        <div
          ref={getRef}
          className={classes.root}
          style={{
            height,
            zIndex: fullSize ? 1200 : 0,
          }}
        >
          <div
            className={classes.filled}
            style={{
              boxShadow: fullSize ? theme.shadows[1] : 'none',
              flexBasis: fullSize ? '76%' : '100%',
            }}
          >
            <UserTasks
              editedEvent={editedEvent}
              events={events}
              height={height}
              getPosition={getPosition}
              setEditedEvent={setEditedEvent}
              startAt={startAt}
              getHours={getHours}
              Y_HEIGHT_BIG={Y_HEIGHT_BIG}
            />
          </div>
          <SvgTimeScale
            finishAt={finishAt}
            fullSize={fullSize}
            height={height}
            startAt={startAt}
            svgWidth={svgWidth}
            width={width}
            X_OFFSET={X_OFFSET}
            Y_HEIGHT_BIG={Y_HEIGHT_BIG}
          />
        </div>
      </div>
    </Popover>
  );
};
