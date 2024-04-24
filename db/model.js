const mongoose = require('mongoose');

const players= new mongoose.Schema({
    PLAYERS:String,
    NATIONALITY:String,
    TYPE:String,
    "PRICE PAID":String,
    TEAM:String
}
)

module.exports= mongoose.model("Player",players);
