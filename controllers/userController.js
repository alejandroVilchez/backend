const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey ="abcd1234";


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: "Registro exitoso", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el registro" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "Login exitoso", token, user });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el login" });
    }
};

exports.authMiddleware = (req, res, next) => {
    const auth = (req.headers.authorization || "").split(" ")[1];
    try {
        req.userId = jwt.verify(auth, secretKey).sub;
        next();
    } catch {
        next("Unauthorized");
    }
};