const express = require('express')
const app = express()
app.use(express.json())
const route = require('./src/routes/route')

app.use('/customers',route)


app.listen(3000, ()=>{
    console.log("Server running on port: 3000")
})