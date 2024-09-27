const express = require('express');
const jwt = require('jsonwebtoken');
const Event = require('../models/event'); 
const router = express.Router();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next(); 
    });
};

// Create event
router.post('/', authenticateToken, async (req, res) => {
  const { title, date, time } = req.body; 
  const userId = req.user.userId; 

  try {
      const event = await Event.create({ title, date, time, userId });
      res.status(201).json(event);
  } catch (err) {
      console.error(err); 
      res.status(500).json({ error: 'Failed to create event' }); 
  }
});


// Get all events for the user
router.get('/', authenticateToken, async (req, res) => { 
    try {
        const events = await Event.findAll({ where: { userId: req.user.userId } });
        res.json(events); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Failed to retrieve events' }); 
    }
});

// Edit an event
router.put('/:id', authenticateToken, async (req, res) => { 
    const { id } = req.params; 
    const { title, date, time } = req.body; 
    try {
        const updated = await Event.update(
            { title, date, time },
            { where: { id, userId: req.user.userId } } 
        );
        if (updated[0] === 0) {
            return res.status(404).json({ error: 'Event not found or not authorized' });
        }
        res.json({ success: true }); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Failed to update event' }); 
    }
});

// Delete an event
router.delete('/:id', authenticateToken, async (req, res) => { 
    const { id } = req.params; 
    try {
        const deleted = await Event.destroy({ where: { id, userId: req.user.userId } });
        if (deleted === 0) {
            return res.status(404).json({ error: 'Event not found or not authorized' });
        }
        res.json({ success: true }); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;

