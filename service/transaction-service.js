import TransactionModel from '../models/transaction-model.js';

class TransactionService {
  async saveTransaction(userId, ticker, buyPrise, amount, date) {
    const transaction = await TransactionModel.create({
      user: userId,
      ticker,
      buyPrise,
      amount,
      date,
    });
    return transaction;
  }
  async getAll(userId) {
    const transactions = await TransactionModel.find({ user: userId });
    return transactions;
  }
  async removeTransaction(id) {
    const transaction = await TransactionModel.remove({ _id: id });
    return transaction;
  }
}

export default new TransactionService();
