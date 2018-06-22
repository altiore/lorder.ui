import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ProjectForm } from './projectForm';

function getSteps() {
  return [
    'Создать Проект',
    'Выбрать Типы Задач',
    'Пригласить участников',
  ];
}

function getStepContent(step: number, handleGoToStep: any) {
  switch (step) {
    case 0:
      return <ProjectForm goToNext={handleGoToStep(1)} />;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export interface INewProps {
  classes: any;
  submitProjectForm: any,
}

export class New extends React.Component<RouteComponentProps<{}> & INewProps, { activeStep: number }> {
  public state = {
    activeStep: 0,
  };

  public handleGoToStep = (activeStep: number) => () => this.setState({ activeStep });

  public handleNext = () => {
    if (this.state.activeStep === 0) {
      this.props.submitProjectForm();
    } else {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    }
  };

  public handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  public handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  public render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Grid container spacing={24} alignItems='center' justify='center'>
        <Grid item xs={12} sm={10} md={8} lg={7}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {getStepContent(index, this.handleGoToStep)}
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Назад
                          </Button>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Завершить' : 'Продолжить'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&quot;re finished</Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
