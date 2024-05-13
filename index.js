const express = require('express')
const api = require('./routes/api')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
app.use(express.json());

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on Port ${port}`)
})