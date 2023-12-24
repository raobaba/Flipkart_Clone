const {Products} = require("./Constant/product.js");
const {Product} = require("./Models/product.schema.js");
const defaultData = async ()=>{
    try {  
         await Product.deleteMany({})
         await Product.insertMany(Products);
        console.log('data imported successfully');
    } catch (error) {
        console.log("Error while Inserting default data",error.message)
    }  
}
module.exports={defaultData}