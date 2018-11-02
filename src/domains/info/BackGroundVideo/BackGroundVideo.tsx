import * as React from 'react';

export interface IBackGroundVideoProps {
  classes?: any;
  height: number;
  width: number;
}

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;

export const BackGroundVideoTsx: React.StatelessComponent<IBackGroundVideoProps> = ({ classes, height, width }) => {
  const isWidth = VIDEO_HEIGHT / VIDEO_WIDTH > height / width;
  let imageStyle: any;
  if (isWidth) {
    imageStyle = {
      height: 'auto',
      top: -((width * VIDEO_HEIGHT) / VIDEO_WIDTH - height) / 2,
      width,
    };
  } else {
    imageStyle = {
      height,
      left: -((height * VIDEO_WIDTH) / VIDEO_HEIGHT - width) / 2,
      width: 'auto',
    };
  }
  return (
    <div className={classes.wrap2}>
      <div className={classes.wrap1}>
        <video autoPlay muted loop className={classes.video} style={imageStyle}>
          <source src="/rain.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
