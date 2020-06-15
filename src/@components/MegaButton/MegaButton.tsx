import React, { useCallback, useState } from 'react';

import cn from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ReactComponent as BackSvg } from './back.svg';
import { ReactComponent as CheckSvg } from './check.svg';
import { ReactComponent as PlaySvg } from './play.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centralButtonTag: {
      '&:hover': {
        cursor: 'pointer',
      },
      background: theme.palette.success.main,
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      height: '40px',
      width: '40px',
      zIndex: 100,
    },
    leftButtonTag: {
      background: theme.palette.error.main,
    },
    megaButton: {
      display: 'flex',
      position: 'relative',
    },
    optionalButtonTag: ({ visible }: any) => ({
      '&:hover': {
        cursor: 'pointer',
      },
      // background: '#77af6d',
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      height: '40px',
      opacity: visible ? 1 : 0,
      transition: 'all 1s ease-in-out',
      width: '40px',
    }),
    paper: ({}: any) => ({
      alignItems: 'center',
      backgroundColor: 'none',
      display: 'flex',
      height: '60px',
      justifyContent: 'space-between',
      left: '-70px',
      position: 'absolute',
      top: '-50px',
      transition: 'all 1s ease-in-out',
      width: '140px',
    }),
    rightButtonTag: {
      background: theme.palette.success.main,
    },
    svgCentralButtonTag: {
      fill: 'white',
      width: '20px',
    },
    svgOptionalButtonTag: {
      fill: 'white',
      width: '20px',
    },
  })
);

interface Props {
  onClickLeft?: () => void;
  onClickCenter: () => void;
  onClickRight?: () => void;
}
export const MegaButton: React.FC<Props> = ({ onClickLeft, onClickCenter, onClickRight }) => {
  const clickLeft = () => {
    if (typeof onClickLeft === 'function') {
      onClickLeft();
    }
  };

  const clickCenter = () => {
    onClickCenter();
  };

  const clickRight = () => {
    if (typeof onClickRight === 'function') {
      onClickRight();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  const {
    megaButton,
    optionalButtonTag,
    centralButtonTag,
    paper,
    svgCentralButtonTag,
    svgOptionalButtonTag,
    leftButtonTag,
    rightButtonTag,
  } = useStyles({
    visible,
  });

  const handleOnMouseOver2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setVisible(true);
  };
  const handleOnMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setVisible(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const checked = open;
  // const open = true;
  const id = open ? 'megaButton' : undefined;
  // const id = 'simple-popper';

  return (
    <>
      <div className={megaButton}>
        <ButtonBase onMouseOver={handleOnMouseOver2} onClick={clickCenter} className={centralButtonTag}>
          <PlaySvg className={svgCentralButtonTag} />
        </ButtonBase>
        <Popper id={id} open={open} anchorEl={anchorEl} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Fade
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <div className={paper} onMouseLeave={handleOnMouseLeave}>
                {typeof onClickLeft === 'function' ? (
                  <ButtonBase className={cn(optionalButtonTag, leftButtonTag)} onClick={clickLeft}>
                    <BackSvg className={svgOptionalButtonTag} />
                  </ButtonBase>
                ) : null}
                {typeof onClickRight === 'function' ? (
                  <ButtonBase className={cn(optionalButtonTag, rightButtonTag)} onClick={clickRight}>
                    <CheckSvg className={svgOptionalButtonTag} />
                  </ButtonBase>
                ) : null}
              </div>
            </Fade>
          )}
        </Popper>
      </div>
    </>
  );
};
