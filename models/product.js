const mongoose=require("mongoose");


const productSchema=mongoose.Schema({
    productname:{type:String,required:true},
    productdescription:{type:String,required:true},
    size:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true}

},
{
    timestamps:true
}
)
module.exports=mongoose.model("Product",productSchema);