import * as React from 'react';
import YouTube from 'react-youtube';

export interface IYouTubeVideoProps {
  classes?: any;
  height: number;
  videoId?: string;
  width: number;
}

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

export const YouTubeVideoTsx: React.FunctionComponent<IYouTubeVideoProps> = ({
  classes,
  height,
  width,
  videoId = 'XZwio64w1QM',
}) => {
  const isWidth = VIDEO_HEIGHT / VIDEO_WIDTH > height / width;
  let opts: any = {
    // @see https://developers.google.com/youtube/player_parameters
    playerVars: {
      allowfullscreen: 1,
      autohide: 1,
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
    },
  };
  const wrapperStyle = {
    position: 'absolute',
  } as any;
  if (isWidth) {
    opts = {
      ...opts,
      height: `${(width * VIDEO_HEIGHT) / VIDEO_WIDTH}px`,
      width: `${width}px`,
    };
    wrapperStyle.top = -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - height) / 2;
  } else {
    opts = {
      ...opts,
      height: `${height}px`,
      width: `${(height * VIDEO_WIDTH) / VIDEO_HEIGHT}px`,
    };
    wrapperStyle.left = -((height * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2;
  }
  return (
    <div className={classes.wrap2}>
      <div className={classes.wrap1}>
        <div style={wrapperStyle}>
          <YouTube videoId={videoId} opts={opts} />
        </div>
      </div>
    </div>
  );
};
