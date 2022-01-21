const mongoose=require("mongoose");


const cartSchema=mongoose.Schema({
    productname:{type:String,required:true},
quantity:{type:Number,required:true},
    size:{type:String,required:true},
    price:{type:Number,required:true},
    color:{type:String,required:true},
    

},
{
    timestamps:true
}
)
module.exports=mongoose.model("cart",cartSchema);