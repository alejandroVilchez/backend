//models\Regatta.js
const mongoose = require('mongoose');

const regattaSchema = new mongoose.Schema({
    owner: ObjectId, 
    name: String,
    isLive: { type: Boolean, default: false },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date
  });

module.exports = mongoose.model('Regatta', regattaSchema);