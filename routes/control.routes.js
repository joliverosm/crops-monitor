const express = require('express');
const router = express.Router();

const Control = require('../models/control');

router.get('/', async (req, res) => {
    let control = await Control.find();
    res.json(control);
});

router.post('/', async (req, res) => {
    const { motor, turbine } = req.body;
    let control = new Control({ motor, turbine });
    await control.save();
    res.json({ status: 'Data Received' });
});


router.put('/motor/:id/:state', async (req, res) => {
    const motor = req.params.state;
    let updateControl = { motor };
    await Control.findByIdAndUpdate(req.params.id, updateControl);
    res.json({ status: 'Data Upadated' });
});

router.put('/turbine/:id/:state', async (req, res) => {
    const turbine = req.params.state;
    let updateControl = { turbine };
    await Control.findByIdAndUpdate(req.params.id, updateControl);
    res.json({ status: 'Data Upadated' });
});


module.exports = router;