const Obstacle = require("../models/Obstacle");
exports.createObstacle = async (req, res) => {
    try {
        const obstacle = await Obstacle.create({owner: req.userId, ...req.body});
        res.status(201).json(obstacle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllObstacles = async (req, res) => {
    try {
        const obstacles = await Obstacle.find({ owner: req.userId }); 
        res.status(200).json(obstacles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteObstacle = async (req, res) => {
    try {
        await Obstacle.deleteOne({ _id: req.params.id, owner: req.userId });
        // Puedes devolver 200 OK con el objeto borrado o 204 No Content
        res.status(200).json({ message: "Obstacle deleted"});
        // o res.status(204).send();
    } catch (error) {
         // Añadir manejo si el ID no es un formato válido de ObjectId
         if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
         }
        res.status(500).json({ error: error.message });
    }
};