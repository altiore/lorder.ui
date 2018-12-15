import * as H from 'highcharts';
import * as React from 'react';
import { Chart, HighchartsChart, Legend, PieSeries, Title, Tooltip, withHighcharts } from 'react-jsx-highcharts';

export interface IPieChartProps {
  data: any;
  className?: string;
  title?: string;
  setUpHighcharts?: any;
  unit?: string;
}

class PieChartTsx extends React.Component<IPieChartProps, {}> {
  componentDidMount(): void {
    const { setUpHighcharts } = this.props;
    if (setUpHighcharts) {
      setUpHighcharts();
    }
  }

  render() {
    const { data, title, unit } = this.props;
    return (
      <HighchartsChart>
        {title && <Title>{title}</Title>}

        <Chart plotBackgroundColor={null} plotBorderWidth={null} plotShadow={null} type="pie" />

        <Tooltip pointFormat={'{series.name}: <b>{point.percentage:.1f}%</b>'} />

        <Legend />

        <PieSeries
          allowPointSelect
          name="Доля пользователя"
          data={data}
          cursor="pointer"
          center={['50%', 150]}
          size={300}
          showInLegend={false}
          dataLabels={{
            enabled: true,
            format: `<b>{point.name}</b>: {point.y}${unit ? ` ${unit}` : ''}`,
            style: {
              color: (H.theme && H.theme.contrastTextColor) || 'black',
            },
          }}
        />
      </HighchartsChart>
    );
  }
}

export const PieChart = withHighcharts(PieChartTsx, H);
