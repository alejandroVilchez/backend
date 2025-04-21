const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bycrypt.hash(this.password, 10);
  }
});
userSchema.methods.verify = pwd => bycrypt.compare(pwd, this.password);

module.exports = mongoose.model('User', userSchema);
