import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import includes from 'lodash-es/includes';
import * as React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router-dom';

export interface IDigitsProps {
  classes: {
    cube: string;
    digit: string;
    item: string;
    paper: string;
    points: string;
    root: string;
  };
}

interface IState {
  counter: number;
}

export class Digits extends React.PureComponent<RouteComponentProps<{}> & IDigitsProps, IState> {
  constructor(props: RouteComponentProps<{}> & IDigitsProps) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  public handlePlus = () => this.setState(({ counter }) => ({ counter: counter + 1 }));

  public handleMinus = () => this.setState(({ counter }) => ({ counter: counter - 1 }));

  public render() {
    const { classes } = this.props;
    const { counter } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <IconButton onClick={this.handleMinus}>
              <FaMinus />
            </IconButton>

            <div className={classes.digit}>{counter}</div>

            <IconButton onClick={this.handlePlus}>
              <FaPlus />
            </IconButton>
          </Paper>
          <Grid container direction="column" alignItems="center" className={classes.cube}>
            <Grid container direction="row" justify="center" className={classes.points}>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon
                  style={{ fontSize: 80, color: includes([2, 3, 4, 5, 6], counter) ? 'black' : 'white' }}
                />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon style={{ fontSize: 80, color: includes([6], counter) ? 'black' : 'white' }} />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon
                  style={{ fontSize: 80, color: includes([4, 5, 6], counter) ? 'black' : 'white' }}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" justify="center" className={classes.points}>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon style={{ fontSize: 80, color: includes([], counter) ? 'black' : 'white' }} />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon
                  style={{ fontSize: 80, color: includes([1, 3, 5], counter) ? 'black' : 'white' }}
                />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon style={{ fontSize: 80, color: includes([], counter) ? 'black' : 'white' }} />
              </Grid>
            </Grid>

            <Grid container direction="row" justify="center" className={classes.points}>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon
                  style={{ fontSize: 80, color: includes([4, 5, 6], counter) ? 'black' : 'white' }}
                />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon style={{ fontSize: 80, color: includes([6], counter) ? 'black' : 'white' }} />
              </Grid>
              <Grid item xs={4} container alignItems="center" justify="center">
                <FiberManualRecordIcon
                  style={{ fontSize: 80, color: includes([2, 3, 4, 5, 6], counter) ? 'black' : 'white' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
