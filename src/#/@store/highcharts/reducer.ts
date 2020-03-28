import { handleActions } from 'redux-actions';

import * as H from 'highcharts';

import { setUpHighcharts } from './actions';

const setUpHighchartsHandler = (state: any) => {
  if (!state.isLoaded) {
    H.setOptions({
      colors: H.map(H.getOptions().colors, function(color: string) {
        return {
          radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
          stops: [
            [0, color],
            [
              1,
              H.Color(color)
                .brighten(-0.3)
                .get('rgb'),
            ] /* darken */,
          ],
        };
      }),
    });
  }
  return { isLoaded: true };
};

export const highcharts: any = handleActions(
  {
    [setUpHighcharts.toString()]: setUpHighchartsHandler,
  },
  { isLoaded: false }
);
