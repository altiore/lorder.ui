import * as React from 'react';
import YouTube from 'react-youtube';

export interface IYouTubeVideoProps {
  classes?: any;
  height: number;
  width: number;
}

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

export const YouTubeVideoTsx: React.FunctionComponent<IYouTubeVideoProps> = ({ classes, height, width }) => {
  const isWidth = VIDEO_HEIGHT / VIDEO_WIDTH > height / width;
  let opts: any = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      allowfullscreen: 1,
      autohide: 1,
      autoplay: 1,
      cc_load_policy: 0,
      controls: 0,
      disablekb: 1,
      frameborder: 0,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      mute: 1,
      rel: 0,
      showinfo: 0,
    },
  };
  if (isWidth) {
    opts = {
      ...opts,
      height: `${(width * VIDEO_HEIGHT) / VIDEO_WIDTH}px`,
      top: -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - height) / 2,
      width: `${width}px`,
    };
  } else {
    opts = {
      ...opts,
      height: `${height}px`,
      left: -((height * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2,
      width: `${(height * VIDEO_WIDTH) / VIDEO_HEIGHT}px`,
    };
  }
  return (
    <div className={classes.wrap2}>
      <div className={classes.wrap1}>
        <YouTube videoId="NCuDOMkWkcw" opts={opts} />
      </div>
    </div>
  );
};
