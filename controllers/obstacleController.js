const Obstacle = require("../models/Obstacle");
exports.createObstacle = async (req, res) => {
    try {
        const obstacle = new Obstacle(req.body);
        await obstacle.save();
        res.status(201).json(obstacle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};