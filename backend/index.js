const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
connectToMongo()

app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(5000,()=>{
    console.log(`server is running on localhost:5000`)
})