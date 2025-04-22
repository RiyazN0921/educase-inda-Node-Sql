const express = require('express')

const sequelize = require('./config/database.config')

require('dotenv').config()

const schoolRoutes = require('./routes/school.routes')

const { globalErrorHandler } = require('./middleware/error.middleware')

const app = express()

app.use(express.json())

app.use('/api', schoolRoutes)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Unable to sync database:', err)
  })
