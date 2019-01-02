import { createElement } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IEvent } from 'src/@types';
import { DailyRoutine as DailyRoutineTsx } from 'src/components/DailyRoutine';
import { openDialog } from 'src/store/dialog';
import { events } from 'src/store/tasks';
import { isRequiredConfirmationChangedEvents } from 'src/store/ui';
import { saveUserWorks } from 'src/store/user-works';
import { ConfirmDialogTsx } from './ConfirmDialog';

const mapStateToProps = createStructuredSelector({
  events,
  isRequiredConfirmationChangedEvents,
});

const mapDispatch = {
  openDialog,
  saveUserWorks,
};

const mergeProps = (
  { isRequiredConfirmationChangedEvents, ...restState }: any,
  { openDialog, saveUserWorks, ...restDispatch }: any,
  restOwn: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
  onChange: isRequiredConfirmationChangedEvents
    ? (data: IEvent[]) =>
        openDialog(createElement(ConfirmDialogTsx, { onSubmit: () => saveUserWorks(data) }), {
          maxWidth: 'xs',
          scroll: 'body',
        })
    : saveUserWorks,
});

export const DailyRoutine = connect<{ events: IEvent[] }, {}, { onChange: (events: IEvent[]) => any }>(
  mapStateToProps,
  mapDispatch,
  mergeProps
)(DailyRoutineTsx);
