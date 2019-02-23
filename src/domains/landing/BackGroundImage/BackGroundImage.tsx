import * as React from 'react';

import image from './group_57.jpg';

export interface IBackGroundVideoProps {
  classes?: any;
  height: number;
  width: number;
}

const MEDIA_WIDTH = 1920;
const MEDIA_HEIGHT = 1080;

export const BackGroundImageTsx: React.FunctionComponent<IBackGroundVideoProps> = ({ classes, height, width }) => {
  const isWidth = MEDIA_HEIGHT / MEDIA_WIDTH > height / width;
  let imageStyle: any;
  if (isWidth) {
    imageStyle = {
      height: 'auto',
      top: -((width * MEDIA_HEIGHT) / MEDIA_WIDTH - height) / 2,
      width,
    };
  } else {
    imageStyle = {
      height,
      left: -((height * MEDIA_WIDTH) / MEDIA_HEIGHT - width) / 2,
      width: 'auto',
    };
  }
  return (
    <div className={classes.wrap2}>
      <div className={classes.wrap1}>
        <img src={image} className={classes.media} style={imageStyle} />
      </div>
    </div>
  );
};
