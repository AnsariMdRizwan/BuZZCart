


const express = require("express");
const { registerUser ,loginUser,logoutUser,authmiddleware} = require("../../controllers/auth/auth-controller")

const router = express.Router()


router.post('/register', registerUser)

router.post('/login', loginUser)  
router.post('/logout', logoutUser)
router.get('/check-auth',authmiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authorized User",
        user,
    })
})

module.exports = router;

  


