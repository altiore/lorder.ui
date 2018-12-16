import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';

export interface IStartStopBtnProps {
  className?: string;
  classes?: any;
  isLarge?: boolean;
  isStarted: boolean;
  theme: Theme;
  onStart?: (event: React.SyntheticEvent<any>) => any;
  onStop?: (event: React.SyntheticEvent<any>) => any;
  width?: number;
}

export const StartStopBtnTsx: React.FunctionComponent<IStartStopBtnProps> = ({
  className,
  classes,
  isLarge,
  isStarted,
  theme,
  onStart,
  onStop,
  width,
}) => {
  let size: 'small' | 'medium' = width && width < theme.breakpoints.values.sm ? 'small' : 'medium';
  if (isLarge) {
    size = 'medium';
  }
  if (isStarted) {
    return (
      <Tooltip title="Остановить задачу" placement={'top'}>
        <Fab onClick={onStop} className={classes.stop} size={size as any}>
          <StopIcon fontSize={isLarge ? 'large' : 'default'} />
        </Fab>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Начать задачу" placement={'top'}>
      <Fab aria-label="Play button" className={classes.play} onClick={onStart} size={size as any}>
        <PlayArrowRounded fontSize={isLarge ? 'large' : 'default'} />
      </Fab>
    </Tooltip>
  );
};
