import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  media: {
    crossOrigin: 'anonymous',
    height: 1080,
    position: 'absolute',
    width: 1920,
  },
  wrap1: {
    display: 'block',
    height: '100vh',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transition: 'opacity 1s ease',
    width: '100vw',
  },
  wrap2: {
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
