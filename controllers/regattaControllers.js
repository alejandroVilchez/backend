const Regatta = require('../models/Regatta');
exports.createRegatta = async (req, res) => {
    try{
        const regatta = await Regatta.create({owner: req.userId, name: req.body.name});
        res.status(201).json(regatta);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
};
exports.listRegattas = async (req, res) => {
    const regs = await Regatta.find({owner: req.userId});
    res.json(regs);
};