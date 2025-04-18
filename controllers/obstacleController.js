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
exports.getAllObstacles = async (req, res) => {
    try {
        const obstacles = await Obstacle.find(); // Encuentra todos
        res.status(200).json(obstacles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteObstacle = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la URL
        const deletedObstacle = await Obstacle.findByIdAndDelete(id);
        if (!deletedObstacle) {
            return res.status(404).json({ message: "Obstacle not found" });
        }
        // Puedes devolver 200 OK con el objeto borrado o 204 No Content
        res.status(200).json({ message: "Obstacle deleted", obstacle: deletedObstacle });
        // o res.status(204).send();
    } catch (error) {
         // Añadir manejo si el ID no es un formato válido de ObjectId
         if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
         }
        res.status(500).json({ error: error.message });
    }
};