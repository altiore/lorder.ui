import { Theme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';

export default function(theme: Theme): Partial<Overrides> {
  return {
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 11px) scale(1)',
      },
    },
  };
}
