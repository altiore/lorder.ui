import * as Sentry from '@sentry/browser';
import React from 'react';

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
    if (this.state.error) {
      // render fallback UI
      return <a href="/" onClick={this.showReportDialog('boundary')}>Report feedback</a>;
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }

  private showReportDialog = (eventId: string) => (event: React.SyntheticEvent) => {
    event.preventDefault();
    Sentry.showReportDialog({ eventId });
  };
}
