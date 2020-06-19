import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import Popper from '@material-ui/core/Popper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import PauseIcon from '@material-ui/icons/Pause';
import PlaySvg from '@material-ui/icons/PlayArrowRounded';

import uniqid from 'uniqid';

import BackSvg from './back';
import CheckSvg from './check';
import PlayPauseSvg from './play-pause';

const BTN_SIZE = 44;
const SMALL_BTN_SIZE = 40;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centralBtn: {
      '&:hover': {
        boxShadow: theme.shadows[5],
        cursor: 'pointer',
      },
      background: theme.palette.success.main,
      border: 'none',
      borderRadius: '50%',
      boxShadow: theme.shadows[1],
      height: BTN_SIZE,
      width: BTN_SIZE,
      zIndex: 100,
    },
    grey: {
      background: theme.palette.grey['500'],
    },
    leftBtn: {
      background: theme.palette.error.main,
    },
    optionalBtn: {
      '&:hover': {
        boxShadow: theme.shadows[5],
        cursor: 'pointer',
        height: BTN_SIZE,
        width: BTN_SIZE,
      },
      border: 'none',
      borderRadius: '50%',
      boxShadow: theme.shadows[1],
      height: SMALL_BTN_SIZE,
      transition: theme.transitions.create(['height', 'margin', 'width']),
      width: SMALL_BTN_SIZE,
    },
    optionalBtnWrap: {
      alignItems: 'center',
      display: 'flex',
      height: BTN_SIZE,
      justifyContent: 'center',
      width: BTN_SIZE + 16,
    },
    rightBtn: {
      background: theme.palette.success.main,
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
    },
    svgStyle: {
      fill: 'white',
      pointerEvents: 'none',
    },
    svgStyleCustom: {
      fill: 'white',
      pointerEvents: 'none',
      width: 20,
    },
  })
);

interface Props {
  isPaused: boolean;
  isCurrent: boolean;
  onClickLeft?: () => void;
  onClickCenter: () => void;
  onClickRight?: () => void;
}

const timers: { [key in string]: ReturnType<typeof setTimeout> } = {};

export const MegaButton: React.FC<Props> = ({ isPaused, isCurrent, onClickLeft, onClickCenter, onClickRight }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const uniqId = useMemo(() => uniqid('start-stop-btn'), []);

  const handleCenterOver = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (timers[uniqId]) {
        clearTimeout(timers[uniqId]);
        delete timers[uniqId];
      }

      if (!anchorEl) {
        setAnchorEl(event.currentTarget);
      }
    },
    [anchorEl, setAnchorEl]
  );

  const handleCenterOut = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
    }
    timers[uniqId] = setTimeout(() => {
      setAnchorEl(null);
    }, 400);
  }, [setAnchorEl]);

  const handleHiddenOver = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
      delete timers[uniqId];
    }
  }, []);

  const handleHiddenOut = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
      delete timers[uniqId];
    }
    setAnchorEl(null);
  }, [setAnchorEl]);

  const id = useMemo(() => {
    return anchorEl ? uniqId : undefined;
  }, [anchorEl, uniqId]);

  const {
    centralBtn,
    leftBtn,
    optionalBtn,
    optionalBtnWrap,
    rightBtn,
    root,
    svgStyle,
    svgStyleCustom,
    grey,
  } = useStyles();

  const handlePauseTask = () => {
    console.log('Нажали кнопку паузу задачи');
  };

  const handlePlayTask = () => {
    console.log('Нажали кнопку запуска задачи');
  };

  const handleReplayTask = () => {
    console.log('Нажали на кнопку на возобновить задачу');
  };

  const getCentralBtn = () => {
    if (isPaused === true && isCurrent === true) {
      return (
        <ButtonBase
          onMouseOver={handleCenterOver}
          onMouseOut={handleCenterOut}
          onClick={handleReplayTask}
          className={centralBtn}
        >
          <PlayPauseSvg className={svgStyleCustom} />
        </ButtonBase>
      );
    } else if (isPaused === false && isCurrent === false) {
      return (
        <ButtonBase
          onMouseOver={handleCenterOver}
          onMouseOut={handleCenterOut}
          onClick={handlePauseTask}
          className={cn(centralBtn, grey)}
        >
          <PauseIcon style={{ color: 'white' }} />
        </ButtonBase>
      );
    } else if (isPaused === true && isCurrent === false) {
      return (
        <ButtonBase
          onMouseOver={handleCenterOver}
          onMouseOut={handleCenterOut}
          onClick={handlePlayTask}
          className={centralBtn}
        >
          <PlaySvg fontSize="large" className={svgStyle} />
        </ButtonBase>
      );
    } else if (isPaused === false && isCurrent === true) {
      return (
        <ButtonBase
          onMouseOver={handleCenterOver}
          onMouseOut={handleCenterOut}
          onClick={handlePauseTask}
          className={cn(centralBtn, grey)}
        >
          <PauseIcon style={{ color: 'white' }} />
        </ButtonBase>
      );
    }
  };

  return (
    <div className={root}>
      {getCentralBtn()}
      {typeof onClickLeft === 'function' && (
        <Popper id={id + '-left'} open={Boolean(id)} anchorEl={anchorEl} transition placement="left-start">
          {({ TransitionProps }) => (
            <Zoom {...TransitionProps}>
              <div className={optionalBtnWrap}>
                <ButtonBase
                  onMouseOver={handleHiddenOver}
                  onMouseOut={handleHiddenOut}
                  className={cn(optionalBtn, leftBtn)}
                  onClick={onClickLeft}
                >
                  <BackSvg className={svgStyleCustom} />
                </ButtonBase>
              </div>
            </Zoom>
          )}
        </Popper>
      )}
      {typeof onClickRight === 'function' && (
        <Popper id={id + '-right'} open={Boolean(id)} anchorEl={anchorEl} transition placement="right-start">
          {({ TransitionProps }) => (
            <Zoom {...TransitionProps}>
              <div className={optionalBtnWrap}>
                <ButtonBase
                  onMouseOver={handleHiddenOver}
                  onMouseOut={handleHiddenOut}
                  className={cn(optionalBtn, rightBtn)}
                  onClick={onClickRight}
                >
                  <CheckSvg className={svgStyleCustom} />
                </ButtonBase>
              </div>
            </Zoom>
          )}
        </Popper>
      )}
    </div>
  );
};
