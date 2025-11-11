import express from 'express';

const router = express.Router();

// 🌱 Seeds route
router.get('/seeds', (req, res) => {
  res.json({ message: 'Seeds data will come here.' });
});

// 🧑‍🌾 Consumer route
router.get('/consumer', (req, res) => {
  res.json({ message: 'Consumer data will come here.' });
});

// 🚜 Lend Machines route
router.get('/lendMachines', (req, res) => {
  res.json({ message: 'Machines to lend will be listed here.' });
});

export default router;
