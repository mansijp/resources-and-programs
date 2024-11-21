// server/routes/clientProgressRoutes.js
const express = require('express');
const router = express.Router();
const ClientProgress = require('../models/ClientProgress');


router.get('/api/client-progress/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('userId totalPointsEarned');
    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

router.get('/api/client-progress/points-only/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('totalPointsEarned');
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

router.put('/api/client-progress/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { totalPointsEarned } = req.body;
    const updatedData = { totalPointsEarned };

    const updatedUser = await ClientProgress.findByIdAndUpdate(
      clientId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Client Progress not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating client progress:', error);
    res.status(500).json({ message: 'Error updating client progress', error });
  }
});

module.exports = router;
