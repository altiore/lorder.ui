import * as H from 'highcharts';
import * as React from 'react';
import { Chart, HighchartsChart, Legend, PieSeries, Title, Tooltip, withHighcharts } from 'react-jsx-highcharts';

export interface IPieChartProps {
  data: any;
  className?: string;
  title?: string;
  setUpHighcharts?: any;
  unit?: string;
  width?: number;
}

class PieChartTsx extends React.Component<IPieChartProps, {}> {
  componentDidMount(): void {
    const { setUpHighcharts } = this.props;
    if (setUpHighcharts) {
      setUpHighcharts();
    }
  }

  render() {
    const { data, title, unit, width } = this.props;
    let size = 300;
    let height = 400;
    if (width) {
      if (width <= 320) {
        size = 100;
        height = size * 1.8;
      }
      if (width > 320 && width < 500) {
        size = 150;
        height = size * 1.7;
      }
    }
    return (
      <HighchartsChart>
        {title && <Title>{title}</Title>}

        <Chart plotBackgroundColor={null} plotBorderWidth={null} plotShadow={null} type="pie" height={height} />

        <Tooltip pointFormat={'{series.name}: <b>{point.percentage:.1f}%</b>'} />

        <Legend />

        <PieSeries
          allowPointSelect
          name="Доля пользователя"
          data={data}
          cursor="pointer"
          center={['50%', size / 2]}
          size={size}
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
