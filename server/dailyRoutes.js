/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let dailyRoutes = express.Router()

// CRUD STEPS for Daily Challeneges Database here

dailyRoutes.route("/daily").get( async (req, res) => {
    let db = database.getDb()
    console.time("db time")
    let data = await db.collection("rounds").find({}).toArray()
    // error handling
    if (data.length > 0){
        res.json(data)
        console.timeEnd("db time")
    } else {
        throw new Error("Data was not found")
    }
})

dailyRoutes.route("/daily/:id").get( async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("rounds").findOne({_id: new ObjectId(req.params.id)})
    // error handling
    if (Object.keys(data).length > 0) {
        res.json(data)
    } else {
        throw new Error("Data was not found")
    }
})


dailyRoutes.route("/daily").post( async (req, res) => {
    let db = database.getDb()
    let mongoObject = {
        date: req.body.date, 
        round1: req.body.round1,
        round2: req.body.round2,
        round3: req.body.round3,
        round4: req.body.round4,
        round5: req.body.round5
    }
    let data = await db.collection("rounds").insertOne(mongoObject)
    res.json(data)
})

module.exports = dailyRoutes