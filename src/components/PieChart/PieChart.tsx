import * as H from 'highcharts';
import * as React from 'react';

import { Chart, HighchartsChart, Legend, PieSeries, Title, Tooltip, withHighcharts } from 'react-jsx-highcharts';

export interface IPieChartProps {
  data: any;
  className?: string;
}

export class PieChartTsxClass extends React.Component<IPieChartProps, {}> {
  componentWillMount() {
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

  componentWillUnmount() {
    H.setOptions({
      colors: [
        '#7cb5ec',
        '#434348',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1',
      ],
    });
  }

  render() {
    const { data } = this.props;
    return (
      <HighchartsChart exporting>
        <Title>Combination chart</Title>

        <Chart plotBackgroundColor={null} plotBorderWidth={null} plotShadow={false} type={'pie'} />

        <Tooltip pointFormat={'{series.name}: <b>{point.percentage:.1f}%</b>'} />

        <Legend />

        <PieSeries
          allowPointSelect
          name="Total consumption"
          data={data}
          cursor="pointer"
          center={['50%', 150]}
          size={300}
          showInLegend={false}
          dataLabels={{
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} h',
            style: {
              color: (H.theme && H.theme.contrastTextColor) || 'black',
            },
          }}
        />
      </HighchartsChart>
    );
  }
}

export const PieChartTsx = withHighcharts(PieChartTsxClass, H);
