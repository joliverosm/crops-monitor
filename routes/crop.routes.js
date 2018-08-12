const express = require('express');
const router = express.Router();

const socket = require("../index");

const Crop = require('../models/crop');

router.get('/', async (req, res) => {
    let crop = await Crop.find();
    res.json(crop);
});

router.get('/:id', async (req, res) => {
    let crop = await crop.findById(req.params.id);
    res.json(crop);
});

router.post('/', async (req, res) => {
    const { temperature, humidity } = req.body;
    let crop = new Crop({ temperature, humidity });
    await crop.save();
    /* socket.on('stateMotor', (data) => {
        console.log(data);
    }); */
    res.json({ status: 'Data Received' });
});
router.put('/:id', async (req, res) => {
    const { temperature, humidity } = req.body;
    let updateTodo = { temperature, humidity };
    await Crop.findByIdAndUpdate(req.params.id, updateTodo);
    res.json({ status: 'Data Upadated' });
});
router.delete('/:id', async (req, res) => {
    await Crop.findOneAndRemove(req.params.id);
    res.json({ status: 'Data Deleted' });
});

module.exports = router;