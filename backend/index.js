require('dotenv').config()
const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log('server has started')
})