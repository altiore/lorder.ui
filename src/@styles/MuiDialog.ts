import { Theme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

import { prettyScroll1 } from './variables';

export default function(theme: Theme): Partial<Overrides> {
  return {
    MuiDialogActions: {
      root: {
        [theme.breakpoints.down('sm')]: {
          bottom: 0,
          margin: 0,
          padding: '4px',
          position: 'fixed',
          width: 'calc(100% - 8px)',
          zIndex: 100,
        },
      },
    },
    MuiDialogContent: {
      root: prettyScroll1(theme),
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        borderRadius: theme.spacing(0.5),
        display: 'flex',
        flexFlow: 'row nowrap',
        height: 60,
        justifyContent: 'space-between',
        padding: `0 ${theme.spacing(1)}px`,
      },
    },
  };
}
