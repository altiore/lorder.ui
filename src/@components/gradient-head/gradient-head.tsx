import React from 'react';

import cn from 'classnames';

import Grid, { GridProps } from '@material-ui/core/Grid';
import { lighten, makeStyles, Theme } from '@material-ui/core/styles';

import { PROJECT_COLOR } from '@types';

const MAP_COLOR: { [key in PROJECT_COLOR]: [string, string] } = {
  [PROJECT_COLOR.BLACK]: ['#29292b', '#424247'],
  [PROJECT_COLOR.BLUE]: ['#1B85EB', lighten('#1B85EB', 0.3)],
  [PROJECT_COLOR.GREEN]: ['#116610', '#338610'],
  [PROJECT_COLOR.VIOLET]: ['#646BD9', lighten('#646BD9', 0.3)],
};

interface IProps extends GridProps {
  color?: PROJECT_COLOR;
  children: React.ReactNode;
}

export const GradientHeadTsx: React.FC<IProps> = ({ color = PROJECT_COLOR.BLACK, children, className, ...rest }) => {
  const { contentWrap, projectHeadWrap } = useStyles({ color });
  return (
    <Grid container className={cn(projectHeadWrap, className)} alignItems="center" justify="center" {...rest}>
      <Grid container justify="space-between" className={contentWrap}>
        {children}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  contentWrap: {
    margin: '5px 5px 0 5px',
    maxWidth: 1280,
    padding: '16px 1px 1px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginLeft: 0,
    },
  },
  projectHeadWrap: ({ color }: { color: PROJECT_COLOR }) => {
    const [first, second] = MAP_COLOR[color || PROJECT_COLOR.BLACK];
    return {
      backgroundImage: `linear-gradient(45deg, ${first} 0%, ${first} 40%, ${second} 52%, ${first} 70%, ${first} 100%)`,
      minHeight: 224,
      paddingBottom: 30,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    };
  },
}));
