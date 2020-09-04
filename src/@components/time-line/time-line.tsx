import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Popover from 'react-popover';

import cn from 'classnames';
import get from 'lodash/get';
import minBy from 'lodash/minBy';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

import CurrentTimeIndicator from './current-time-indicator';
import EditWork from './edit-work';
import { SvgTimeScale } from './svg-time-scale/svg-time-scale';
import UserTasks from './user-tasks';

import { IEvent } from '@types';

export const Y_HEIGHT_BIG = 84;
const Y_HEIGHT_LITTLE = 8;
const X_OFFSET = 8;
const timelineStub = () => null;
const DATE_FORMAT = 'YYYY-MM-DD';

export interface ITimeLineProps {
  currentRange: [moment.Moment, moment.Moment];
  events: IEvent[];
  fullSize?: boolean;
  getRef: any;
  onTimelineClick?: () => void;
  patchUserWork: any;
  currentTime: string;
  currentTimeCustom?: string;
  userWorkId?: number;
  width: number;
}

export const TimeLineTsx: React.FC<ITimeLineProps> = ({
  currentRange,
  currentTime,
  currentTimeCustom,
  events,
  fullSize,
  getRef,
  onTimelineClick = timelineStub,
  patchUserWork,
  userWorkId,
  width,
}) => {
  const startHour = useMemo((): number => {
    const first = minBy(events, (ev: IEvent) => {
      if (ev.userWork.finishAt) {
        return ev.userWork.finishAt.format(DATE_FORMAT) === currentRange[0].format(DATE_FORMAT)
          ? ev.userWork.startAt.hours()
          : 24;
      }

      return 25;
    });
    const hours = first ? first.userWork.startAt.hours() : 0;
    return first && hours < currentRange[0].hours() ? hours : 0;
  }, [currentRange, events]);

  const finishHour = useMemo((): number => {
    const hours = currentRange[1].hours();
    return hours < 24 ? (hours < 23 ? hours + 2 : hours + 1) : 24;
  }, [currentRange]);

  const [height] = useState(fullSize ? Y_HEIGHT_BIG : Y_HEIGHT_LITTLE);
  const [editedEvent, setEditedEvent] = useState<IEvent>();

  useEffect(() => {
    if (fullSize && userWorkId) {
      setTimeout(() => {
        const evt = events.find(e => e?.userWork?.id === userWorkId);
        if (evt) {
          setEditedEvent(evt);
        }
      }, 200);
    }
  }, [events, fullSize, userWorkId]);

  const handleEditEventClose = useCallback(
    (e: any) => {
      const eventId = parseInt(get(e, ['target', 'dataset', 'id'], 0), 10);
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

  const timeLineWidth = useMemo(() => {
    return width - (fullSize ? 48 : 16);
  }, [fullSize, width]);

  const getHours = useCallback(
    (el?: moment.Moment | null) => {
      return el
        ? el.format(DATE_FORMAT) === currentRange[0].format(DATE_FORMAT)
          ? el.hours() + el.minutes() / 60 + el.seconds() / 3600
          : el.diff(currentRange[0]) > 0
          ? finishHour
          : startHour
        : currentRange[1].hours() + currentRange[1].minutes() / 60 + currentRange[1].minutes() / 3600;
    },
    [currentRange, finishHour, startHour]
  );

  const getPosition = useCallback(
    (time?: moment.Moment | null) => {
      const res = Math.round(((getHours(time) - startHour) * timeLineWidth) / (finishHour - startHour));
      if (res === 0) {
        return res;
      }
      if (res === timeLineWidth) {
        return res + 2 * X_OFFSET;
      }
      return res + X_OFFSET;
    },
    [finishHour, getHours, startHour, timeLineWidth]
  );

  const { filled, popoverPaper, root, rootFullSize, rootWrap } = useStyles();

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
        <Paper className={popoverPaper}>
          <EditWork
            event={editedEvent}
            initialValues={formInitialValues}
            onClose={handleEditEventClose}
            patchUserWork={patchUserWork}
          />
        </Paper>
      }
    >
      <div className={rootWrap} onClick={handleClick}>
        <CurrentTimeIndicator
          fullSize={fullSize}
          left={
            moment().isBetween(currentRange[0], currentRange[1].clone().add(2, 'minute'))
              ? getPosition(moment())
              : getPosition(currentRange[1])
          }
        >
          {currentTimeCustom || currentTime}
        </CurrentTimeIndicator>
        <div ref={getRef} className={cn(root, { [rootFullSize]: fullSize })} style={{ height }}>
          <div className={filled} style={{ flexBasis: fullSize ? '76%' : '100%' }}>
            <UserTasks
              editedEvent={editedEvent}
              events={events}
              height={height}
              getPosition={getPosition}
              setEditedEvent={setEditedEvent}
              Y_HEIGHT_BIG={Y_HEIGHT_BIG}
            />
          </div>
          <SvgTimeScale
            finishAt={finishHour}
            fullSize={fullSize}
            height={height}
            startAt={startHour}
            svgWidth={timeLineWidth}
            width={width}
            X_OFFSET={24}
            Y_HEIGHT_BIG={Y_HEIGHT_BIG}
          />
        </div>
      </div>
    </Popover>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  filled: {
    border: '1px solid #FFB200',
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
  },
  popoverPaper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: `0 ${theme.spacing(1)}px`,
    pointerEvents: 'auto',
  },
  root: {
    alignItems: 'flex-end',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
    transition: theme.transitions.create(['height', 'z-index'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    width: '100%',
  },
  rootFullSize: {
    padding: '2px 16px 16px',
    zIndex: 1200,
  },
  rootWrap: {
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
  },
}));
