// server/routes/clientProgressRoutes.js
const express = require('express');
const router = express.Router();
const ClientProgress = require('../models/ClientProgress');

// Fetch user progress summary
router.get('/api/client-progress/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('userId totalPointsEarned learningPath.currentLevel learningPath.completedModules');
    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

// Fetch points only
router.get('/api/client-progress/points-only/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('totalPointsEarned');
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

// Update total points and currentLevel
router.put('/api/client-progress/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { totalPointsEarned } = req.body;

    const updatedData = {
      totalPointsEarned,
      'learningPath.currentLevel': 'Rookie',
      'learningPath.completedModules': []
    };
    const updatedUser = await ClientProgress.findByIdAndUpdate(
      clientId,
      { $set: updatedData },
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

router.put('/:id/complete-module', async (req, res) => {
  const { id } = req.params;
  const { moduleName, currentLevel } = req.body;

  if (!moduleName) {
    return res.status(400).json({ message: 'moduleName is required.' });
  }

  try {
    const progress = await ClientProgress.findById(id);
    console.log(progress);
    if (!progress) {
      return res.status(404).json({ message: 'Client progress not found.' });
    }

    if (progress.learningPath.completedModules.includes(moduleName)) {
      return res.status(409).json({ message: 'Module already completed.' });
    }

    // Update module + current level
    progress.learningPath.completedModules.push(moduleName);
    if (currentLevel) {
      progress.learningPath.currentLevel = currentLevel;
    }

    console.log(progress.learningPath);
    console.log(progress.learningPath.completedModules);

    await progress.save();

    res.status(200).json({
      message: `Module '${moduleName}' marked as complete.`,
      completedModules: progress.learningPath.completedModules,
      currentLevel: progress.learningPath.currentLevel
    });
  } catch (error) {
    console.error('Error updating module progress:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});


module.exports = router;
