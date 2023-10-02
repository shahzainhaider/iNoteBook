const express = require('express')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const router = express.Router()


const JWT_SECRET = 'SHahzainH@ider'


//Route 1: Create a user using POST "/api/auth/createuser". no login requrired
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 character').isLength({min:5}),
],
 async (req,res)=>{
  let success = false
// email validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
try {
    // checking of duplicate users
    let user =await User.findOne({email:req.body.email});
    if(user){
        res.status(404).json({success,message:'User already exist'})
    }

    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassowrd = await bcrypt.hash(req.body.password,salt);

    // Creating users
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassowrd,
    });

    //JWT....
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    success = true
    res.json({success,authToken})
      
    } catch (error) {
        res.send('internal server error')
    }
})


//Route 2: Create a LOGIN using POST "/api/auth/login".
router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','password cannot be empty').exists()
],
async (req,res)=>{
  let success = false
  // email validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;

  try {
    let user = await User.findOne({email})
    if(!user){
      success = false
      return res.status(400).json({success, error:'Please try to login with correct credentials'})
    }

    const passwordCompare =await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error:'Please try to login with correct credentials'})
    }

    const data = {
      user:{
        id:user.id
      }
    }
    success = true
    const authToken=jwt.sign(data,JWT_SECRET)
    res.send({success,authToken})
    
  } catch (error) {
    res.send({error:'internal server error'})
    
  }

});

//Route 3: Get user details using POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    userId=req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
    
  } catch (error) {
    res.status(500).json({error:'internal server error'})
  }
})



module.exports=router;
