import * as Highcharts from 'highcharts';
import * as React from 'react';

import {
  Chart,
  // ColumnSeries,
  HighchartsChart,
  Legend,
  PieSeries,
  // PlotOptions,
  // SplineSeries,
  Title,
  Tooltip,
  withHighcharts,
  // XAxis,
  // YAxis
} from 'react-jsx-highcharts';

export interface IPieChartProps {
  className?: string;
}

const pieData = [
  {
    name: 'Jane',
    y: 13,
  },
  {
    name: 'John',
    y: 23,
  },
  {
    name: 'Joe',
    y: 19,
  },
];

export const PieChartTsx1: React.FunctionComponent<IPieChartProps> = ({}) => (
  <HighchartsChart>
    <Chart plotBackgroundColor={null} plotBorderWidth={null} plotShadow={false} type={'pie'} />

    <Title>Combination chart</Title>

    <Tooltip pointFormat={'{series.name}: <b>{point.percentage:.1f}%</b>'} />

    <Legend />

    {/*<XAxis categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']}/>*/}

    {/*<YAxis>*/}
    {/*<ColumnSeries name="Jane" data={[3, 2, 1, 3, 4]}/>*/}
    {/*<ColumnSeries name="John" data={[2, 3, 5, 7, 6]}/>*/}
    {/*<ColumnSeries name="Joe" data={[4, 3, 3, 9, 0]}/>*/}
    {/*<SplineSeries name="Average" data={[3, 2.67, 3, 6.33, 3.33]}/>*/}
    <PieSeries name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
    {/*</YAxis>*/}
  </HighchartsChart>
);

export const PieChartTsx = withHighcharts(PieChartTsx1, Highcharts);
