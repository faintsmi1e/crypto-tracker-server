import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const TransactionSchema = new Schema({
  ticker: { type: String, required: true },
  buyPrise: { type: Number, required: true },
  amount: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, }
});

export default model('Transaction', TransactionSchema);
