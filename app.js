const express = require("express");
const app = express();
const mongoose = require("mongoose");

const flash = require("flash");
const session = require("express-session");

const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASS;

mongoose.connect(
  process.env.MONGO_URI, // environment variable
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Some error occured..." + err);
  }
);

app.use(
  session({
    secret: "secret is here",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

const Customers = require("./models/customers");
const Transactions = require("./models/transaction");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/customers", async (req, res, next) => {
  const customers = await Customers.find({});
  res.render("customers", { customers });
});

app.post("/customers", async (req, res, next) => {
  const customers = await Customers.find({});
  res.render("customers", { customers });
});

const customerResponse = async (req, res, next) => {
  try {
    const customers = await Customers.find({});
    let { id } = req.params;
    let { err, success } = req.body;
    let cname;
    for (let index = 0; index < customers.length; index++) {
      const user = customers[index];
      if (user.SNo == req.params.id) {
        cname = user.Name;
      } else {
        continue;
      }
    }
    res.render("viewcustomer", { customers, cname, err, success, id });
  } catch (err) {
    console.log(err);
    next();
  }
};

app.get("/viewcustomer/:id", customerResponse);

app.post("/viewcustomer/:id", async (req, res, next) => {
  var sender = req.body.Sender;
  var receiver = req.body.Receiver;
  var amount = req.body.Amount;

  if (sender == receiver) {
    req.body.err = "You cannot send money to yourself";
    return customerResponse(req, res);
  } else {
    var customer = await Customers.findOne({ Name: sender });
    let err = "";
    if (customer.Balance < amount) {
      req.body.err = "Your balance is low";
      return customerResponse(req, res);
    } else {
      const newTransaction = new Transactions(req.body);
      await newTransaction.save();

      await Customers.findOneAndUpdate(
        { Name: sender },
        { $inc: { Balance: -amount } },
        { new: true }
      );

      await Customers.findOneAndUpdate(
        { Name: receiver },
        { $inc: { Balance: amount } },
        { new: true }
      );
      req.body.success = "Transfer Successful";
      return customerResponse(req, res);
    }
  }
});

app.get("/transactions", async (req, res, next) => {
  const transactions = await Transactions.find({});
  res.render("transactions", { transactions });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server connected at port ${port}.... `);
});
