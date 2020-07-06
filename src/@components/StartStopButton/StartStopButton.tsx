import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import PauseIcon from '@material-ui/icons/PauseRounded';
import PlaySvg from '@material-ui/icons/PlayArrowRounded';
import StopSvg from '@material-ui/icons/StopRounded';

import TooltipBig from '@components/TooltipBig';

import uniqid from 'uniqid';

import BackSvg from './svg/back';
import CheckSvg from './svg/check';
import PlayPauseSvg from './svg/play-pause';

const BTN_SIZE = 44;
const BTN_SIZE_HOVERED = 52;
const BTN_SIZE_SMALL = 40;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centralBtn: {
      '& > svg': {
        zIndex: 1,
      },
      '&:before': {
        backgroundColor: theme.palette.success.main,
        borderRadius: '50%',
        boxShadow:
          '0px 3px 5px -1px rgba(102, 204, 51,0.2), 0px 6px 10px 0px rgba(102, 204, 51,0.14), 0px 1px 18px 0px rgba(102, 204, 51,0.12)',
        content: '""',
        height: BTN_SIZE,
        left: '50%',
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        transition: theme.transitions.create(['box-shadow', 'color', 'height', 'width']),
        width: BTN_SIZE,
      },
      '&:hover:before': {
        boxShadow: theme.shadows[5],
        cursor: 'pointer',
        height: BTN_SIZE_HOVERED,
        width: BTN_SIZE_HOVERED,
      },
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      height: BTN_SIZE_HOVERED,
      width: BTN_SIZE_HOVERED,
    },
    centralGrey: {
      '&:before': {
        backgroundColor: '#D8D8D8',
        boxShadow:
          '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
      },
    },
    centralRed: {
      '&:before': {
        backgroundColor: theme.palette.error.main,
        boxShadow:
          '0px 3px 5px -1px rgba(255, 51, 0,0.2), 0px 6px 10px 0px rgba(255, 51, 0,0.14), 0px 1px 18px 0px rgba(255, 51, 0,0.12)',
      },
    },
    leftBtn: {
      '&:before': {
        backgroundColor: theme.palette.error.main,
      },
    },
    optionalBtn: {
      '& > svg': {
        zIndex: 1,
      },
      '&:before': {
        border: 'none',
        borderRadius: '50%',
        boxShadow: theme.shadows[1],
        content: '""',
        height: BTN_SIZE_SMALL,
        left: '50%',
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        transition: theme.transitions.create(['height', 'width']),
        width: BTN_SIZE_SMALL,
      },
      border: 'none',
      borderRadius: '50%',
      height: BTN_SIZE_HOVERED,
      width: BTN_SIZE_HOVERED,
      zIndex: 1,
    },
    optionalBtnWrap: {
      '&:hover $optionalBtn:before': {
        boxShadow: theme.shadows[5],
        cursor: 'pointer',
        height: BTN_SIZE_HOVERED,
        width: BTN_SIZE_HOVERED,
      },
      alignItems: 'center',
      backgroundColor: 'transparent',
      display: 'flex',
      height: BTN_SIZE_HOVERED,
      justifyContent: 'center',
      position: 'relative',
      width: BTN_SIZE_HOVERED,
    },
    popper: {
      zIndex: 1300,
    },
    rightBtn: {
      '&:before': {
        background: theme.palette.success.main,
      },
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      height: BTN_SIZE_HOVERED,
      position: 'relative',
      width: BTN_SIZE_HOVERED,
    },
    svgStyle: {
      fill: 'white',
      height: 32,
      pointerEvents: 'none',
      width: 32,
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
  isCurrent?: boolean;

  onBringBack?: (e: React.SyntheticEvent<any>) => void;
  onComplete?: (e: React.SyntheticEvent<any>) => void;
  onResume: (e: React.SyntheticEvent<any>) => void;
  onStart: (e: React.SyntheticEvent<any>) => void;
  onPause: (e: React.SyntheticEvent<any>) => void;
}

const timers: { [key in string]: ReturnType<typeof setTimeout> } = {};

export const StartStopButton: React.FC<Props> = ({
  isPaused,
  isCurrent,
  onBringBack,
  onComplete,
  onResume,
  onStart,
  onPause,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const uniqId = useMemo(() => uniqid('start-stop-btn'), []);

  const fastClose = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
    }
    setAnchorEl(null);
  }, [setAnchorEl, uniqId]);

  const delayedClose = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
    }
    timers[uniqId] = setTimeout(() => {
      setAnchorEl(null);
    }, 400);
  }, [setAnchorEl, uniqId]);

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
    [anchorEl, setAnchorEl, uniqId]
  );

  const handleHiddenOver = useCallback(() => {
    if (timers[uniqId]) {
      clearTimeout(timers[uniqId]);
    }
  }, [uniqId]);

  const id = useMemo(() => {
    return anchorEl ? uniqId : undefined;
  }, [anchorEl, uniqId]);

  const {
    centralBtn,
    centralGrey,
    centralRed,
    leftBtn,
    optionalBtn,
    optionalBtnWrap,
    popper,
    rightBtn,
    root,
    svgStyle,
    svgStyleCustom,
  } = useStyles();

  const open = Boolean(id);

  return (
    <ClickAwayListener onClickAway={fastClose}>
      <div className={root}>
        {isCurrent ? (
          isPaused ? (
            <TooltipBig title="Возобновить" placement="top">
              <ButtonBase
                onMouseOver={handleCenterOver}
                onMouseOut={delayedClose}
                onClick={onResume}
                className={centralBtn}
              >
                <PlayPauseSvg className={svgStyleCustom} />
              </ButtonBase>
            </TooltipBig>
          ) : (
            <TooltipBig title="Поставить на паузу" placement="top">
              <ButtonBase
                onMouseEnter={handleCenterOver}
                onMouseOut={delayedClose}
                onClick={onPause}
                className={cn(centralBtn, {
                  [centralRed]: !open,
                  [centralGrey]: open,
                })}
              >
                {open ? <PauseIcon className={svgStyle} /> : <StopSvg className={svgStyle} />}
              </ButtonBase>
            </TooltipBig>
          )
        ) : (
          <TooltipBig title="Начать" placement="top">
            <ButtonBase
              onMouseEnter={handleCenterOver}
              onMouseOut={delayedClose}
              onClick={onStart}
              className={centralBtn}
            >
              <PlaySvg className={svgStyle} />
            </ButtonBase>
          </TooltipBig>
        )}

        {typeof onBringBack === 'function' && (
          <Popper
            className={popper}
            id={id + '-left'}
            open={open}
            anchorEl={anchorEl}
            transition
            placement="left-start"
          >
            {({ TransitionProps }) => (
              <Zoom {...TransitionProps}>
                <div className={optionalBtnWrap} onMouseEnter={handleHiddenOver} onMouseLeave={delayedClose}>
                  <TooltipBig title={'Вернуть назад'} placement="top">
                    <ButtonBase className={cn(optionalBtn, leftBtn)} onClick={onBringBack}>
                      <BackSvg className={svgStyleCustom} />
                    </ButtonBase>
                  </TooltipBig>
                </div>
              </Zoom>
            )}
          </Popper>
        )}
        {typeof onComplete === 'function' && (
          <Popper
            className={popper}
            id={id + '-right'}
            open={open}
            anchorEl={anchorEl}
            transition
            placement="right-start"
          >
            {({ TransitionProps }) => (
              <Zoom {...TransitionProps}>
                <div className={optionalBtnWrap} onMouseEnter={handleHiddenOver} onMouseLeave={delayedClose}>
                  <TooltipBig title={'Завершить'} placement="top">
                    <ButtonBase className={cn(optionalBtn, rightBtn)} onClick={onComplete}>
                      <CheckSvg className={svgStyleCustom} />
                    </ButtonBase>
                  </TooltipBig>
                </div>
              </Zoom>
            )}
          </Popper>
        )}
      </div>
    </ClickAwayListener>
  );
};
