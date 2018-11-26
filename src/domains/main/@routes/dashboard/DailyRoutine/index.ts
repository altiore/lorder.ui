import { connect } from 'react-redux';

import { DailyRoutine as DailyRoutineTsx, IEvent } from 'src/components/DailyRoutine';

const events: any = [];

const mapStateToProps = () => ({
  events,
});

const mapDispatch = {};

export const DailyRoutine = connect<{ events: IEvent[] }, {}, { onChange: (events: IEvent[]) => any }>(
  mapStateToProps,
  mapDispatch
)(DailyRoutineTsx);
