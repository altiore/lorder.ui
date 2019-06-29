import * as Highcharts from 'highcharts';
import React from 'react';
import {
  Chart,
  ColumnSeries,
  HighchartsChart,
  Legend,
  SplineSeries,
  Title,
  Tooltip,
  withHighcharts,
  XAxis,
  YAxis,
} from 'react-jsx-highcharts';

export interface ILinearChartProps {
  className?: string;
}

export const LinearChartTsx1: React.FunctionComponent<ILinearChartProps> = ({}) => (
  <HighchartsChart>
    <Chart plotBackgroundColor={null} plotBorderWidth={null} plotShadow type={'pie'} />

    <Title>Combination chart</Title>

    <Tooltip pointFormat={'{series.name}: <b>{point.percentage:.1f}%</b>'} />

    <Legend />

    <XAxis categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

    <YAxis>
      <ColumnSeries name="Jane" data={[3, 2, 1, 3, 4]} />
      <ColumnSeries name="John" data={[2, 3, 5, 7, 6]} />
      <ColumnSeries name="Joe" data={[4, 3, 3, 9, 0]} />
      <SplineSeries name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
    </YAxis>
  </HighchartsChart>
);

export const LinearChartTsx = withHighcharts(LinearChartTsx1, Highcharts);
