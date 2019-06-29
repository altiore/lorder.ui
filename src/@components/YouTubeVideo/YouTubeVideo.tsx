import React, {useCallback, useMemo} from 'react';
import YouTube from 'react-youtube';

import { useStyles } from "./styles";

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

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

const VIDEO_STATUSES = {
  NOT_STARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 3,
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
  const onStateChange = useCallback((event) => {
    if (opts.start && opts.end && event.data === VIDEO_STATUSES.ENDED) {
      event.target.loadVideoById({
        videoId: videoId,
        startSeconds: opts.start,
        endSeconds: opts.end,
      });
    }
  }, [opts, videoId]);
  const isWidth = useMemo(() => VIDEO_HEIGHT / VIDEO_WIDTH > height / width, [height, width]);
  const wrapperStyle = useMemo(() => ({
    position: "absolute",
    top: isWidth ? -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - height) / 2 : 0,
    left: isWidth ? 0 : -((height * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2,
  }), [isWidth, height, width]);
  const videoStyle = useMemo(() => {
    return {
      height: isWidth ? `${(width * VIDEO_HEIGHT) / VIDEO_WIDTH}px` : `${height}px`,
      width: isWidth ? `${width}px` : `${(height * VIDEO_WIDTH) / VIDEO_HEIGHT}px`,
    };
  }, [height, isWidth, width]);
  const preparedOpts = useMemo(() => ({
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
    height: "100%",
    width: "100%",
  }), [opts]);

  return (
    <div style={wrapperStyle as any}>
      <div className={classes.video} style={videoStyle as any}>
        <YouTube
          videoId={videoId}
          opts={preparedOpts as any}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};

YouTubeVideoTsx.defaultProps = {
  opts: {},
};
