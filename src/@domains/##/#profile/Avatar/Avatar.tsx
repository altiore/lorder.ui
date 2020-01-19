import React, { useCallback, useState } from 'react';

import MuiAvatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { useDropzone } from 'react-dropzone';

import { useStyles } from './styles';

interface IAvatar {
  avatar?: any;
  email: string;
  uploadAvatar: (file: File) => void;
}

export const Avatar: React.FC<IAvatar> = ({ avatar, email, uploadAvatar }) => {
  const classes = useStyles();

  const [src, setSrc] = useState(avatar);

  const [hovered, setHovered] = useState(false);

  const handleOver = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        setSrc(binaryStr);
      };

      reader.readAsDataURL(acceptedFiles[0]);

      uploadAvatar(acceptedFiles[0]);
    },
    [setSrc, uploadAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classes.wrapper} onMouseOver={handleOver} onMouseLeave={handleLeave}>
      <MuiAvatar alt={email} src={src} className={classes.avatar} />
      <Grow in={hovered}>
        <ButtonBase {...getRootProps()} className={classes.edit}>
          <input {...getInputProps()} />
          <Typography variant="body2">{isDragActive ? 'Отпустите файл здесь ...' : 'Обновить фото'}</Typography>
        </ButtonBase>
      </Grow>
    </div>
  );
};
