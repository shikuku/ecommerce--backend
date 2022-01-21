const router=require("express").Router();
const Product=require("../models/product")
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken");


router.post("/add", async (req,res)=>{
    const newProduct=new Product({
        productname:req.body.productname,
        productdescription:req.body.productdescription,
        color:req.body.color,
        size:req.body.price,
        price:req.body.price,
        image:req.body.image,
        

    })

    try{
        const savedProduct=await newProduct.save()
        res.status(201).json(savedProduct)
    }
    catch(err){
        res.status(404).json(err)
    }

    
})


// update products

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
    const id = req.params.id
    const updates=req.body
    const options={new:true}
    const updatedProduct=await Product.findByIdAndUpdate(id,updates,options)
    console.log(updatedProduct)
    res.status(200).json(updatedProduct)
    }
    catch(err){
        
    res.status(500).json(err)
    }
    })



    //delete products


    router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
        try{
            res.status(200).json("product successfully deleted")
    return await Product.findByIdAndDelete(req.params.id)
    
        }
        catch(err){
    res.status(404).json("product not found")
        }
    })




    // find product by id


router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
const product=await Product.findById(req.params.id)
const {password, ...others}=product._doc
res.status(200).json(others)
    }
    catch(err){
res.json(err)
    }
})

// find all products

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    

    try{
        const product=await Product.find()
        res.status(200).json(product)
    }
    catch(err){
res.json(err)
    }
})

module.exports = router;