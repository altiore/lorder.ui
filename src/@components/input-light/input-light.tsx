import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SearchIco from '@components/@icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '& > input': {
        backgroundColor: 'transparent',
        border: 0,
        borderRadius: 6,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: '30px',
        margin: '0 0 0 -32px',
        outlineWidth: 0,
        padding: '0 0 0 32px',
        width: '100%',
      },
      '& > svg': {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: theme.spacing(0, 1),
      },
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: 6,
      display: 'flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: '16px',
      height: theme.spacing(3.75),
      justifyContent: 'flex-start',
    },
    inputDark: {
      '& > svg': {
        color: '#9F9F9F',
      },
      '& input': {
        color: '#fafafa',
      },
      '& input::placeholder': {
        color: '#9F9F9F',
      },
      '&:focus-within': {
        '& > svg': {
          color: theme.palette.secondary.main,
        },
        backgroundColor: 'rgb(61, 61, 63)',
      },
      border: '1px solid #9F9F9F',
      color: '9F9F9F',
    },
    inputLight: {
      '& > svg': {
        color: '#cecfcd',
      },
      '&:focus-within': {
        '& > svg': {
          color: theme.palette.primary.main,
        },
        backgroundColor: '#fafafa',
      },
      border: '1px solid #F3F3F3',
    },
  })
);

interface IInputLight extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  dark?: boolean;
  icon: JSX.Element;
}

export const InputLightTsx: React.FC<IInputLight> = ({ icon, dark, ...props }) => {
  const { input, inputLight, inputDark } = useStyles();

  return (
    <div className={`${input} ${dark ? inputDark : inputLight}`}>
      <SearchIco />
      <input {...props} />
    </div>
  );
};
