const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()

const { PORT, ORIGIN } = require("./src/config/keys")

require("./src/database")

app.use(cors({
  origin: ORIGIN
}))
app.use(express.json({ extended: true }));
app.use('/uploads', express.static(path.join('src', 'uploads')));

app.use('/note', require('./src/routes/note'))
app.use('/user', require('./src/routes/user'))

app.listen(PORT, () => console.log(`
  Server on http://localhost:${PORT};
  Client on ${ORIGIN};
`))