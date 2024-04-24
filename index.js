require("dotenv").config()
const express = require('express');
const connectdb = require("./db/connectDb.js")
const app = express()
const cors = require('cors')
app.use(cors({
    methods: "GET",
    origin: '*',
    credentials: true
}))
const Player = require("./db/model.js")
app.use(express.static('./public'))


app.get("/find", async (req, res) => {
    const { name, team } = req.query
    try {
        if (name == undefined) {
            const player = await Player.find({ TEAM: team })
            res.status(200).json({
                success: true,
                players: player
            })
        }
        else {
            const player = await Player.aggregate([
                {
                    $search: {
                        "index": "iplplayers",
                        "compound": {
                            "must":
                                [
                                    { "text": { "query": `${name}`, "path": "PLAYERS" } }
                                ],
                            "should": [
                                { "text": { "query": `${team}`, "path": "TEAM" } },
                            ]
                        }
                    }
                },
                {
                    $sort: {
                        "overall": 1
                    }
                }
            ]
            )

            res.status(200).json({
                success: true,
                players: player
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

connectdb()
    .then(() => {
        app.listen(3000, () => console.log("Server started at 3000 "))
    })
    .catch((error) => {
        console.log(error)
    })

