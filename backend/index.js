const express = require("express")
const cors = require("cors")
const rootRouter = require("./routes/index")

const app = express()

app.use(cors())
app.use(express.json());

//here coming requests go into routes/index.js routes
//all request will go to routes folder
app.use("/api/v1",rootRouter)


app.listen(3000 , ()=>{
    console.log("i m listening")
})