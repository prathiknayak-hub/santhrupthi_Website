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
router.get('/',(req,res) => res.render('login', { layout: false }));
router.post('/',registervalidator,(req,res) => {
    console.log("12365e36eehfbh")
    auth.login(req,res);
});

module.exports = router;