const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')


connectDB()
const app = express()

const usersRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));



app.use('/api/users', usersRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})