import TransactionService from "../service/transaction-service.js";

  class TransactionController {
    async getTransactions(req, res, next) {
      try {
        const {userId} = req.params
        const transactions = await TransactionService.getAll(userId);
        return res.json(transactions);
      } catch (e) {
        next(e);
      }
    }

    async saveTransaction(req, res, next) {
      try {
        const {userId, ticker, buyPrise, amount, date} = req.body
        const transaction = await TransactionService.saveTransaction(userId, ticker, buyPrise, amount, date);
        return res.json(transaction);
      } catch (e) {
        next(e);
      }
    }

    async removeTransaction(req, res, next) {
      try {
        const {id} = req.params
        const transaction = await TransactionService.removeTransaction(id);
        return res.json(transaction);
      } catch (e) {
        next(e);
      }
    }
  }

  export default new TransactionController()