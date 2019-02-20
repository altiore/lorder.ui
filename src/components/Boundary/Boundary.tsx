import Tooltip from '@material-ui/core/Tooltip';
import * as Sentry from '@sentry/browser';
import * as React from 'react';

import ReportIcon from './freshdesk-icon-export.svg';

export interface IBoundaryProps {
  children: React.ReactNode;
  classes: any;
}

export interface IBoundaryState {
  error: any;
}

export default class Boundary extends React.Component<IBoundaryProps, IBoundaryState> {
  state = { error: null };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.error) {
      // render fallback UI
      return <a onClick={this.showReportDialog('boundery')}>Report feedback</a>;
    } else {
      if (!this.props.children) {
        return null;
      }
      // when there's not an error, render children untouched
      return (
        <>
          {this.props.children}
          <div className={classes.report} onClick={this.showReportDialog('manual')}>
            <Tooltip title="Оставить отзыв">
              <ReportIcon />
            </Tooltip>
          </div>
        </>
      );
    }
  }

  private showReportDialog = (eventId: string) => () => {
    Sentry.showReportDialog({ eventId });
  };
}
