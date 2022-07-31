const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const auth = require('../controllers/auth');

const registervalidator=[
    body("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email address"),
    body("password")
    .exists()
    .notEmpty()
    .isLength({min:6,max:20})
    .withMessage("Please enter a valid password")
]

// Register Page
router.get('/',(req,res) => res.render('register', { layout: false }));

// Register Handle
router.post('/', registervalidator ,async (req,res)=>{
    auth.register(req,res);
});

module.exports = router;