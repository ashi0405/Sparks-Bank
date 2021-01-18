var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
  Sender: {
    type: String,
  },
  Receiver: {
    type: String,
  },
  Amount: {
    type: Number,
  },
});

const Transaction = mongoose.model("Transactions", transactionSchema);
module.exports = Transaction;
