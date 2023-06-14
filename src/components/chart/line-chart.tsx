import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, ChartData, ChartOptions, Chart, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface LineChartProps {
  data: ChartData<'line', number[], string>;
  options: ChartOptions;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
    return (
        <Line data={data} options={options} />
    );
};

export default LineChart;
