/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

const express = require("express")
const cors = require("cors")
const connect = require("./connect")
const daily = require("./dailyRoutes")

const app = express()
const PORT = 5723;

app.use(cors())
app.use(express.json())
app.use(daily)

app.listen(PORT, async () => {
    await connect.connectServer()
    console.log(`Server has started on localhost:${PORT}`)
})
