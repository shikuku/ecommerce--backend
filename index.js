const mongoose = require("mongoose");
const userRoutes=require("./routes/user");
const userProduct=require("./routes/product");
const userAuth=require("./routes/auth");
const userOrder=require("./routes/order");
const userCart=require("./routes/cart");
const dotenv = require("dotenv");
dotenv.config()

const express=require("express")
const app=express()
const PORT=5000|| process.env.PORT;
app.use(express.json())
app.use("/api/user",userRoutes);


app.use("/api/cart",userCart);
app.use("/api/order",userOrder);
app.use("/api/product",userProduct);
app.use("/api/auth",userAuth)
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DBconnected")})
.catch((err)=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})




