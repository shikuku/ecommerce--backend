const router=require("express").Router();
const order = require("../models/order");
const Order=require("../models/order");
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken");


router.post("/add", async (req,res)=>{
    const newOrder=new Order({
        productname:req.body.productname,
        quantity:req.body.quantity,
        color:req.body.color,
        size:req.body.size,
        price:req.body.price,
        image:req.body.image,

        
        
        

    })

    try{
        const savedOrder=await newOrder.save()
        res.status(201).json(savedOrder)
    }
    catch(err){
        res.status(404).json(err)
    }

    
})


// update order

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
    const id = req.params.id
    const updates=req.body
    const options={new:true}
    const updatedorder=await Order.findByIdAndUpdate(id,updates,options)
    console.log(updatedorder)
    res.status(200).json(updatedorder)
    }
    catch(err){
        
    res.status(500).json(err)
    }
    })



    //delete order


    router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
        try{
            res.status(200).json("order successfully deleted")
    return await order.findByIdAndDelete(req.params.id)
    
        }
        catch(err){
    res.status(404).json("order not found")
        }
    })





    // find order by id


router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
const order=await Order.findById(req.params.id)
const {password, ...others}=order._doc
res.status(200).json(others)
    }
    catch(err){
res.json(err)
    }
})

// find all orders

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    

    try{
        const oerder=await Order.find()
        res.status(200).json(oerder)
    }
    catch(err){
res.json(err)
    }
})


module.exports = router;