import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';

export interface IStartStopBtnProps {
  className?: string;
  classes?: any;
  isLarge?: boolean;
  isStarted: boolean;
  onStart?: (event: React.SyntheticEvent<any>) => any;
  onStop?: (event: React.SyntheticEvent<any>) => any;
}

export const StartStopBtnTsx: React.StatelessComponent<IStartStopBtnProps> = ({
  className,
  classes,
  isLarge,
  isStarted,
  onStart,
  onStop,
}) => {
  if (isStarted) {
    return (
      <Tooltip title="Остановить задачу" placement={'top'}>
        <IconButton onClick={onStop} className={classes.stop}>
          <StopIcon fontSize={isLarge ? 'large' : 'inherit'} />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Начать задачу" placement={'top'}>
      <IconButton aria-label="Play button" className={classes.play} onClick={onStart}>
        <PlayArrowRounded fontSize={isLarge ? 'large' : 'inherit'} />
      </IconButton>
    </Tooltip>
  );
};
