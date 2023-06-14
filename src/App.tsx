import { useQuery } from "react-query";
import { fetchBudgets } from "./service/service";
import Table from "./components/table/table-view";
import { Budget } from "./types/budget";
import { Column } from "react-table";
import LineChart from "./components/chart/line-chart";
import PieChart from "./components/chart/pie-chart";
import { ChartOptions } from 'chart.js';
import "./styles/chart.css"

const App: React.FC = () => {

   const budgets = async () => await fetchBudgets();

   const {data: budgetsList} = useQuery(["budgets"], budgets, { keepPreviousData: false, staleTime: Infinity, cacheTime: 0 })

   const columns: Column<Budget>[] = [
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Valor', accessor: 'value' },
    { Header: 'Data', accessor: 'date' },
    { Header: 'Tipo', accessor: 'type' },
    { Header: 'Tags', accessor: 'tag', Cell: ({value}: {value: string[]}) => <>{value.join(', ')}</> },
  ];

  const lineData = {
    labels: budgetsList?.map(item => item.name) || [],
    datasets: [
      {
        label: 'Valor',
        data: budgetsList?.map(item => parseFloat(item.value.replace(',', '.'))) || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  
  const pieData = {
    labels: budgetsList?.map(item => item.name) || [],
    datasets: [
      {
        label: 'Valor',
        data: budgetsList?.map(item => parseFloat(item.value.replace(',', '.'))) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ]
      }
    ]
  };
  
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };
  

    return (
        <>
            <div className="chart-container">
                <div className="chart">
                    <LineChart data={lineData} options={options} />
                </div>
                <div className="chart">
                    <PieChart data={pieData} options={options} />
                </div>
            </div>
            <Table<Budget> columns={columns} data={budgetsList ?? []} />
        </>
    )
}

export default App;