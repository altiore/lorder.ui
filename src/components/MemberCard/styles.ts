import { Theme } from '@material-ui/core/styles';

const IMAGE_SIZE = 200;

export const styles = (theme: Theme): any => ({
  card: {
    maxWidth: IMAGE_SIZE,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    textAlign: 'center',
  },
  media: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});
