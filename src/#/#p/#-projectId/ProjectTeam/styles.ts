import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    background: 'ffffff',
    color: '#c7c7c7',
    fontSize: 40,
  },
  control: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(197, 197, 197)',
    borderRadius: 3,
    cursor: 'pointer',
    display: 'flex',
    height: 78,
    justifyContent: 'center',
    position: 'absolute',
    top: '30%',
    transform: 'translate(0, -50%)',
    transition: 'all .2s linear',
    width: 55,
  },
  leftControl: {
    '&:hover': {
      boxShadow: '-3.886px 3.147px 20px 0px rgb(244, 245, 248)',
    },
    '&:hover $prevArrow': {
      color: '#ffb200',
    },
    left: -65,
  },

  rightControl: {
    '&:hover': {
      boxShadow: '-3.886px 3.147px 20px 0px rgb(244, 245, 248)',
    },
    '&:hover $nextArrow': {
      color: '#ffb200',
    },
    right: -65,
  },
  sectionWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flexFlow: 'column',
    flexWrap: 'wrap',
    paddingTop: 145,
  },
  sliderWrap: {
    marginBottom: 80,
    marginTop: 80,
    maxWidth: 1290,
    padding: '0 70px',
    width: '100%',
  },
  slideWrap: {
    marginBottom: 15,
  },
  tagline: {
    color: 'rgb(35, 35, 35)',
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: 300,
    lineHeight: 1.133,
    marginBottom: 40,
    marginTop: 0,
    textAlign: 'center',
  },
}));
