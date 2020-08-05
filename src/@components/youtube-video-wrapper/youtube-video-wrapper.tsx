import React, { useCallback, useMemo } from 'react';
import YouTube from 'react-youtube';

import { useStyles } from './styles';

export interface IYouTubeVideoProps {
  component?: any;
  height: number;
  opts?: {
    end?: number;
    start?: number;
  };
  scrollWidth: number;
  videoId: string;
  width: number;
  wrapperProps?: object;
}

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

const VIDEO_STATUSES = {
  BUFFERING: 3,
  CUED: 3,
  ENDED: 0,
  NOT_STARTED: -1,
  PAUSED: 2,
  PLAYING: 1,
};

export const YouTubeVideoTsx: React.FC<IYouTubeVideoProps> = ({
  component: T,
  height,
  opts = {},
  scrollWidth,
  videoId,
  width: globalWidth,
  wrapperProps,
}) => {
  const classes = useStyles();
  const width = useMemo(() => scrollWidth || globalWidth, [scrollWidth, globalWidth]);
  const onStateChange = useCallback(
    event => {
      if (opts.start && opts.end && event.data === VIDEO_STATUSES.ENDED) {
        event.target.loadVideoById({
          endSeconds: opts.end,
          startSeconds: opts.start,
          videoId,
        });
      }
    },
    [opts, videoId]
  );
  const isWidth = useMemo(() => VIDEO_HEIGHT / VIDEO_WIDTH > height / width, [height, width]);
  const wrapperStyle = useMemo(
    () => ({
      left: isWidth ? 0 : -((height * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2,
      top: isWidth ? -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - height) / 2 : 0,
    }),
    [isWidth, height, width]
  );
  const videoStyle = useMemo(() => {
    return {
      height: isWidth ? `${(width * VIDEO_HEIGHT) / VIDEO_WIDTH}px` : `${height}px`,
      width: isWidth ? `${width}px` : `${(height * VIDEO_WIDTH) / VIDEO_HEIGHT}px`,
    };
  }, [height, isWidth, width]);
  const preparedOpts = useMemo(
    () => ({
      height: '100%',
      playerVars: {
        allowfullscreen: 1,
        autohide: 0,
        autoplay: 1,
        cc_load_policy: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 0,
        frameborder: 0,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        mute: 1,
        origin: window.location.origin,
        rel: 0,
        showinfo: 0,
        ...opts,
      },
      width: '100%',
    }),
    [opts]
  );

  return (
    <T {...wrapperProps} style={{ position: 'relative' }}>
      <div className={classes.root}>
        <div className={classes.videoWrapper} style={wrapperStyle as any}>
          <div className={classes.video} style={videoStyle as any}>
            <YouTube videoId={videoId} opts={preparedOpts as any} onStateChange={onStateChange} />
          </div>
        </div>
      </div>
    </T>
  );
};

YouTubeVideoTsx.defaultProps = {
  component: 'div',
  opts: {},
  wrapperProps: {},
};
