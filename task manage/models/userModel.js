const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    name : String ,
    gmail : String ,
    pass : String 
});

const User = mongoose.model('user',newSchema)   //('folder name' , schema name)

module.exports = User ;