const pool = require('../db');



const getTransactions = async (req, res) => {
  try {
    const { month } = req.query;
    const query = `SELECT * FROM transactions WHERE EXTRACT(MONTH FROM date_of_sale) = $1`;
    const { rows } = await pool.query(query, [month]);
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    res.json({ totalSale: 1000, totalSold: 50, totalNotSold: 20 });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBarChartData = async (req, res) => {
    try {
      const { month } = req.query;
      const query = `
        SELECT
            CASE
                WHEN price >= 0 AND price <= 100 THEN '0 - 100'
                WHEN price > 100 AND price <= 200 THEN '101 - 200'
                WHEN price > 200 AND price <= 300 THEN '201 - 300'
                -- Add more cases for other price ranges
                ELSE 'Unknown'
            END AS price_range,
            COUNT(*) AS count
        FROM transactions
        WHERE EXTRACT(MONTH FROM date_of_sale) = $1
        GROUP BY price_range
        ORDER BY price_range
      `;
      const { rows } = await pool.query(query, [month]);
      const barChartData = rows.map(row => ({ label: row.price_range, value: row.count }));
      res.json({ barChartData });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


const getPieChartData = async (req, res) => {
    try {
      const { month } = req.query;
      const query = `
        SELECT category, COUNT(*) AS count
        FROM transactions
        WHERE EXTRACT(MONTH FROM date_of_sale) = $1
        GROUP BY category
      `;
      const { rows } = await pool.query(query, [month]);
      const pieChartData = rows.map(row => ({ label: row.category, value: row.count }));
      res.json({ pieChartData });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = { getTransactions, getStatistics, getBarChartData, getPieChartData };
