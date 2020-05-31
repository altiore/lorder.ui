import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SearchIco from '@components/@icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '& > input': {
        backgroundColor: 'transparent',
        border: 0,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'normal',
        margin: 0,
        outlineWidth: 0,
        padding: 0,
      },
      '& > svg': {
        color: '#cecfcd',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: theme.spacing(0, 1),
      },
      '&:focus-within': {
        '& > svg': {
          color: theme.palette.primary.main,
        },
        backgroundColor: '#fdfdfd',
      },
      alignItems: 'center',
      border: '1px solid #F3F3F3',
      borderRadius: 6,
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: '16px',
      height: theme.spacing(3.75),
      justifyContent: 'flex-start',
    },
  })
);

interface IInputLight extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon: JSX.Element;
}

export const InputLightTsx: React.FC<IInputLight> = ({ icon, ...props }) => {
  const { input } = useStyles();

  return (
    <div className={input}>
      <SearchIco />
      <input {...props} />
    </div>
  );
};
