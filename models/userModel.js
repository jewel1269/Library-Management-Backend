const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role:{type:String, role:"User", default:"User"},
  password: { type: String, required: true },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;