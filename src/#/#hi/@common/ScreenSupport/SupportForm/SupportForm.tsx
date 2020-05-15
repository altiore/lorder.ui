import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as GoSvg } from './go.svg';
import { ReactComponent as PatreonSvg } from './patreon-logo.svg';
import PatreonPng from './patreon.png';
import { ReactComponent as PlaySvg } from './play.svg';

interface ISupportForm {
  name?: string;
}

const IMG_SIZE = {
  height: 95,
  width: 95,
};

const PATREON_IMG = {
  height: 385,
  width: 1680,
};

const useStyles = makeStyles((theme: Theme) => ({
  patreonImg: {
    width: PATREON_IMG.width / 10,
  },
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  supportContent: {
    '& svg': {
      '& [data-color="1"]': {
        fill: 'rgb(232, 91, 70)',
      },
      '& [data-color="2"]': {
        fill: 'rgb(36, 30, 18)',
      },
      height: theme.spacing(5),
      width: theme.spacing(5),
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    width: theme.spacing(38),
  },
  supportLink: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    textDecoration: 'none',
    width: '100%',
  },
  supportLinkText: {
    alignItems: 'center',
    color: theme.pauseColor.main,
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  svgWrapper: {
    '& > svg': {
      fill: theme.palette.secondary.main,
      height: IMG_SIZE.height * 1.5,
      width: IMG_SIZE.width * 1.5,
    },
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    height: IMG_SIZE.height * 2,
    justifyContent: 'center',
    width: IMG_SIZE.width * 2,
  },
}));

export const SupportForm: React.FC<ISupportForm> = () => {
  const { patreonImg, root, supportContent, supportLink, supportLinkText, svgWrapper } = useStyles();

  return (
    <Paper className={root}>
      <a
        className={svgWrapper}
        href="https://www.patreon.com/bePatron?u=5291554"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlaySvg />
      </a>
      <Tooltip title="Поддержать проект">
        <a
          data-patreon-widget-type="become-patron-button"
          href="https://www.patreon.com/bePatron?u=5291554"
          target="_blank"
          rel="noopener noreferrer"
          className={supportLink}
        >
          <div className={supportContent}>
            <PatreonSvg />
            <div className={supportLinkText}>
              <Typography variant="h5">Поддержать проект</Typography>
              <img className={patreonImg} src={PatreonPng} alt="Patreon" />
            </div>
            <GoSvg />
          </div>
        </a>
      </Tooltip>
    </Paper>
  );
};
