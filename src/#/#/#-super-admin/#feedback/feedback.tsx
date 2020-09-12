import React from 'react';

import { Theme } from '@material-ui/core/styles';

import Page from '@components/page';

export interface IFeedbackProps {
  classes: any;
  fetchFeedbackList: any;
  getRef: React.RefObject<{}>;
  feedbackList: any[];
  height: number;
  isWidthSm: boolean;
  theme: Theme;
}

export const Feedback: React.FC<IFeedbackProps> = (): JSX.Element => {
  return <Page>Feedback</Page>;
};
