import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique:true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", userSchema);