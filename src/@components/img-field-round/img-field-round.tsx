import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import MuiAvatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

interface IAvatar {
  fileUrl?: any;
  fileAlt: string;
  isEditable?: boolean;
  uploadFile: (file: File) => void;
}

export const ImgFieldRound: React.FC<IAvatar> = ({ isEditable, fileUrl, fileAlt, uploadFile }) => {
  const classes = useStyles();

  const [src, setSrc] = useState(fileUrl);

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

      uploadFile(acceptedFiles[0]);
    },
    [setSrc, uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classes.wrapper} onMouseOver={handleOver} onMouseLeave={handleLeave}>
      <MuiAvatar alt={fileAlt} src={src} className={classes.avatar} />
      {isEditable && (
        <Grow in={hovered}>
          <ButtonBase {...getRootProps()} className={classes.edit}>
            <input {...getInputProps()} />
            <Typography variant="body2">{isDragActive ? 'Отпустите файл здесь ...' : 'Изменить'}</Typography>
          </ButtonBase>
        </Grow>
      )}
    </div>
  );
};
