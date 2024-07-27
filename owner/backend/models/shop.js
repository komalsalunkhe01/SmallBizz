const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity');
const shopSchema=new mongoose.Schema({
    shopName:{type:String,required:true},
      gov_id: { type: String, required: true },
    email:{type:String,required:true},
    password:{type:String,required:true},
    ownerName:{type:String,required:true},
    mobileNo:({type:Number, required:true}),
    pinCode:({type:Number, required:true}),
    address:({type:String, required:true}),
    category:({type:String, required:true}),
});

shopSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;   
}

const Shop=mongoose.model('Shops',shopSchema);
const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const validate=(data)=>{
    const schema=Joi.object({
        shopName:Joi.string().required().label("Shop Name"),
        gov_id: Joi.string().required(),
        email:Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions).required().label("Password"),
        ownerName:Joi.string().required().label("Owner Name"),
        mobileNo:Joi.number().required().label("Mobile No"),
        pinCode:Joi.number().required().label("Pin Code"),
        address:Joi.string().required().label("Address"),
        category:Joi.string().required().label("Category"),
    });
    return schema.validate(data);
        
};
module.exports={Shop,validate};