import { ITimeLineProps, TimeLineTsx, Y_HEIGHT_BIG } from './time-line';

import { withResize } from '@hooks/with-resize';

export const TimeLine = withResize<ITimeLineProps>(TimeLineTsx);
export const TIME_LINE_HEIGHT = Y_HEIGHT_BIG;
