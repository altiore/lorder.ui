import React from 'react';
import { CustomArrowProps } from 'react-slick';

import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface IProps extends CustomArrowProps {
  type: 'next' | 'prev';
}

export const ArrowTsx: React.FC<IProps> = ({ onClick, type }) => {
  const { arrow, control, leftControl, rightControl } = useStyles();
  return (
    <ButtonBase className={`${control} ${{ next: rightControl, prev: leftControl }[type]}`} onClick={onClick}>
      {type === 'next' ? <ChevronRightIcon className={arrow} /> : <ChevronLeftIcon className={arrow} />}
    </ButtonBase>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    background: theme.palette.background.paper,
    color: '#c7c7c7',
    fontSize: 40,
  },
  control: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(197, 197, 197)',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    height: 78,
    justifyContent: 'center',
    position: 'absolute',
    top: '45%',
    transform: 'translate(0, -50%)',
    transition: 'all .2s linear',
    width: 55,
  },
  leftControl: {
    '&:hover': {
      boxShadow: '-3.886px 3.147px 20px 0px rgb(244, 245, 248)',
    },
    '&:hover > $arrow': {
      color: '#ffb200',
    },
    left: -65,
  },
  rightControl: {
    '&:hover': {
      boxShadow: '-3.886px 3.147px 20px 0px rgb(244, 245, 248)',
    },
    '&:hover > $arrow': {
      color: '#ffb200',
    },
    right: -65,
  },
}));
