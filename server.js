require("dotenv").config();

const app=require("./src/app")
const connectToDB=require("./src/config/database")

connectToDB();
app.listen(()=>{
    console.log("Server is running on port 3000")
})




