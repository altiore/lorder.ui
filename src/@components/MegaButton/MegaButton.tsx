import React, { useCallback, useState } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centralButtonTag: {
      '&:hover': {
        cursor: 'pointer',
      },
      background: '#8c6daf',
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      height: '40px',
      width: '40px',
      zIndex: 100,
    },
    leftButtonTag: {
      background: '#ef5d74',
    },
    megaButton: {
      display: 'flex',
      position: 'relative',
    },
    optionalButtonTag: ({ isVisibleBtn }: any) => ({
      '&:hover': {
        cursor: 'pointer',
      },
      background: '#77af6d',
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      height: '40px',
      opacity: isVisibleBtn ? 1 : 0,
      transition: 'all 1s ease-in-out',
      width: '40px',
    }),
    popperTag: ({ isVisiblePopper }: any) => ({
      alignItems: 'center',
      display: 'flex',
      height: '60px',
      justifyContent: 'space-between',
      left: '-45px',
      position: 'absolute',
      top: '-10px',
      transition: 'all 1s ease-in-out',
      visibility: isVisiblePopper ? 'visible' : 'hidden',
      width: '130px',
      zIndex: 50,
    }),
    rightButtonTag: {
      background: '#8cc759',
    },
  })
);

interface Props {
  onClickLeft?: () => void;
  onClickCenter: () => void;
  onClickRight?: () => void;
}
export const MegaButton: React.FC<Props> = ({ onClickLeft, onClickCenter, onClickRight }) => {
  const [state, setState] = useState({
    isVisibleBtn: false,
    isVisiblePopper: false,
  });

  const clickLeft = () => {
    if (typeof onClickLeft === 'function') {
      onClickLeft();
    }
  };

  const handleOnClickCenter = () => {
    onClickCenter();
  };

  const clickRight = () => {
    if (typeof onClickRight === 'function') {
      onClickRight();
    }
  };

  const { megaButton, optionalButtonTag, centralButtonTag, popperTag } = useStyles({
    isVisibleBtn: state.isVisibleBtn,
    isVisiblePopper: state.isVisibleBtn,
  });

  const handleOnMouseLeave = useCallback(() => {
    setState(s => ({ ...s, isVisiblePopper: false, isVisibleBtn: false }));
  }, []);
  const handleOnMouseOver = useCallback(() => {
    setState(s => ({ ...s, isVisiblePopper: true, isVisibleBtn: true }));
  }, []);

  return (
    <>
      <div className={megaButton}>
        <ButtonBase onMouseOver={handleOnMouseOver} onClick={handleOnClickCenter} className={centralButtonTag}>
          <p>ЦК</p>
        </ButtonBase>
        <div className={popperTag} onMouseLeave={handleOnMouseLeave}>
          {typeof onClickLeft === 'function' ? (
            <ButtonBase className={optionalButtonTag} onClick={clickLeft}>
              <p>ЛК</p>
            </ButtonBase>
          ) : null}
          {typeof onClickRight === 'function' ? (
            <ButtonBase className={optionalButtonTag} onClick={clickRight}>
              <p>ПК</p>
            </ButtonBase>
          ) : null}
        </div>
      </div>
    </>
  );
};
