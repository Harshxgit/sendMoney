// this is database folder , here we create schema and connect to mongodb using mongoose
const mongoose = require("mongoose")
const {secret} = require("./dbconnect")
mongoose.connect(secret)
//Create a schemea for users
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    firstName : {
        type : String ,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName :{
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
})

const accountSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId , //Refrence to User model
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

//Create a model from the schema
const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('User', userSchema)

//export module
module.exports = {
    User,
    Account
}