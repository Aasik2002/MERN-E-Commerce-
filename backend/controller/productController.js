
import Product from "../Models/ProductModel.js";
import HandeleError from "../helper/handleError.js";


// Create Product -- Admin
export const addproduct = async (req,res)=>{
    // console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({message:"Product Added Successfully", product});

}

//Update Product -- Admin
export const updateproduct = async (req,res,next)=>{
const id = req.params.id;
let product = await Product.findByIdAndUpdate(id, req.body, {
    new:true,
    runValidators:true,
    useFindAndModify:false,
});
if(!product){
    //return res.status(500).json({success:false, message:"Product Not Found"});  
    return next(new HandeleError("Product Not Found",404));
}
return res.status(200).json({
    success:true,
    product
});
}

// Delete single Product -- Admin
export const deleteproduct = async (req,res,next)=>{
    const id = req.params.id;
    let product = await Product.findByIdAndDelete(id);
    if(!product){
        //return res.status(500).json({success:false, message:"Product Not Found"});  
        return next(new HandeleError("Product Not Found",404));
    }
    return res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    });
};

//delete all products -- Admin
export const deleteallproduct = async (req,res)=>{
    await Product.deleteMany();
    return res.status(200).json({
        success:true,
        message:"All Products Deleted Successfully"
    });
};

// Get All Product Details by ID
export const getallproduct = async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    });
};

// Get Single Product Details by ID
export const getsingleproduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new HandeleError("Product Not Found",404));
    }
    return res.status(200).json({
        success:true,
        product
    });
};


