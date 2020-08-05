import React, { useCallback, useMemo } from 'react';
import YouTube from 'react-youtube';

import { useStyles } from './styles';

export interface IYouTubeVideoProps {
  height: number;
  opts?: {
    end?: number;
    start?: number;
  };
  scrollWidth: number;
  videoId: string;
  width: number;
}

// нужно, чтоб не было видно ссылок от YouTube
const HEIGHT_OFFSET = 56;
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
  height,
  opts = {},
  scrollWidth,
  videoId,
  width: globalWidth,
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
  const heightWithOffset = useMemo(() => height + HEIGHT_OFFSET, [height]);
  const isWidth = useMemo(() => VIDEO_HEIGHT / VIDEO_WIDTH > heightWithOffset / width, [heightWithOffset, width]);
  const wrapperStyle = useMemo(() => {
    const topOffset = isWidth ? -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - heightWithOffset) / 2 : 0;
    return {
      left: isWidth ? 0 : -((heightWithOffset * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2,
      position: 'absolute',
      top: topOffset > -HEIGHT_OFFSET ? -HEIGHT_OFFSET : topOffset,
    };
  }, [isWidth, heightWithOffset, width]);
  const videoStyle = useMemo(() => {
    return {
      height: isWidth ? `${(width * VIDEO_HEIGHT) / VIDEO_WIDTH}px` : `${heightWithOffset}px`,
      width: isWidth ? `${width}px` : `${(heightWithOffset * VIDEO_WIDTH) / VIDEO_HEIGHT}px`,
    };
  }, [heightWithOffset, isWidth, width]);
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
    <div className={classes.mainWrapper} style={{ width: `calc(100vw - ${globalWidth - scrollWidth}px)` }}>
      <div>
        <div style={wrapperStyle as any}>
          <div className={classes.video} style={videoStyle as any}>
            <YouTube videoId={videoId} opts={preparedOpts as any} onStateChange={onStateChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

YouTubeVideoTsx.defaultProps = {
  opts: {},
};
