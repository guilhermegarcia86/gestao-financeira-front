import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions, Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<'pie', number[], string>;
  options: ChartOptions;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
    return (
        <Pie data={data} options={options} />
    );
};

export default PieChart;
