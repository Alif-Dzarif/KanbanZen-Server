if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()    
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandlers')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`KanbanZen Server running on port ${port}`)
})

module.exports = app