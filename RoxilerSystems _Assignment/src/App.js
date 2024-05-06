import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transactionsResponse = await axios.get('/transactions?month=March');
      const statisticsResponse = await axios.get('/transactions/statistics?month=March');
      const barChartDataResponse = await axios.get('/transactions/bar-chart?month=March');
      const pieChartDataResponse = await axios.get('/transactions/pie-chart?month=March');

      setTransactions(transactionsResponse.data);
      setStatistics(statisticsResponse.data);
      setBarChartData(barChartDataResponse.data);
      setPieChartData(pieChartDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <TransactionsTable transactions={transactions} />
      <Statistics statistics={statistics} />
      <BarChart barChartData={barChartData} />
      <PieChart pieChartData={pieChartData} />
    </div>
  );
}

export default App;
