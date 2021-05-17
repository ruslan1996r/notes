const mongoose = require('mongoose')
const chalk = require('chalk');

const { MONGO_URI } = require("../config/keys")

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('Mongoose connection error ' + err.message))
})

mongoose.connection.once('open', () => {
  console.log(chalk.green("MongoDB connected!"))
})