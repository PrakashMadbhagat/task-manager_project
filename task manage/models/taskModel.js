const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    tname : {type : String , require : true} ,
    tdis : {type : String , require : true} ,
    tstatues : {type : String , require : true},
    tdate : {type : String , require : true} ,
    u_id : {type : String , required : true}
});

const Task = mongoose.model('task',taskSchema)   //('folder name' , schema name)

module.exports = Task ;