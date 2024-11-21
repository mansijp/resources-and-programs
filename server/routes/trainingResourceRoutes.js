// server/routes/trainingResourceRoutes.js
const express = require('express');
const router = express.Router();
const TrainingResource = require('../models/TrainingResource');

router.post('/add', async (req, res) => {
  try {
    const { title, type, description, content, pointsAwarded, categories } = req.body;

    const newResource = new TrainingResource({
      title,
      type,
      description,
      content,
      pointsAwarded,
      categories
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error creating training resource:', error);
    res.status(500).json({ message: 'Error creating training resource', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const resources = await TrainingResource.find().select('title _id');
    res.json(resources);
  } catch (error) {
    console.error('Error fetching training resources:', error);
    res.status(500).json({ message: 'Error fetching training resources', error });
  }
});

router.get('/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const resource = await TrainingResource.findOne({ title });

    if (!resource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Error fetching training resource:', error);
    res.status(500).json({ message: 'Error fetching training resource', error });
  }
});

router.patch('/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const updatedData = req.body;
    const updatedResource = await TrainingResource.findByIdAndUpdate(
      resourceId,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }
    res.json(updatedResource);
  } catch (error) {
    console.error('Error updating training resource:', error);
    res.status(500).json({ message: 'Error updating training resource', error });
  }
});

router.put('/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { title } = req.body;
    const updatedData = { title };

    const updatedResource = await TrainingResource.findByIdAndUpdate(
      resourceId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(updatedResource);
  } catch (error) {
    console.error('Error updating training resource:', error);
    res.status(500).json({ message: 'Error updating training resource', error });
  }
});

router.delete('/api/training-resources/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResource = await TrainingResource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json({ message: 'Training resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting training resource:', error);
    res.status(500).json({ message: 'Error deleting training resource', error });
  }
});

module.exports = router;
