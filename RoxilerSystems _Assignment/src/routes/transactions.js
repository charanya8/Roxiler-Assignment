const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
} = require('../controllers/transactionsController');

router.get('/', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);

module.exports = router;
