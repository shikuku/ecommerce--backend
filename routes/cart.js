const router=require("express").Router();
const Cart=require("../models/cart");
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken");


router.post("/add", async (req,res)=>{
    const newProduct=new Cart({
        productname:req.body.productname,
        quantity:req.body.quantity,
        color:req.body.color,
        size:req.body.price,
        price:req.body.price,
        
        
        

    })

    try{
        const savedProduct=await newProduct.save()
        res.status(201).json(savedProduct)
    }
    catch(err){
        res.status(404).json(err)
    }

    
})




// update cart

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
    const id = req.params.id
    const updates=req.body
    const options={new:true}
    const updatedcart=await Cart.findByIdAndUpdate(id,updates,options)
    console.log(updatedcart)
    res.status(200).json(updatedcart)
    }
    catch(err){
        
    res.status(500).json(err)
    }
    })


    //delete cart


    router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
        try{
            res.status(200).json("product successfully deleted")
    return await Cart.findByIdAndDelete(req.params.id)
    
        }
        catch(err){
    res.status(404).json("product not found")
        }
    })


// find cart by id


router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
const cart=await Cart.findById(req.params.id)
const {password, ...others}=cart._doc
res.status(200).json(others)
    }
    catch(err){
res.json(err)
    }
})




// find all carts

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    

    try{
        const cart=await Cart.find()
        res.status(200).json(cart)
    }
    catch(err){
res.json(err)
    }
})


module.exports = router;