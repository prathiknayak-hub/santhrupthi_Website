const pool = require('../utils/dbconfig.js');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const JWT = require('jsonwebtoken')

async function register (req,res) {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()[1].msg});
            return
        }
        const {type,email,password,confirmpassword} = req.body;
        if(type=="donar"){
            var check_if_user_exists = await pool.query("select email from DONAR where email=$1",[email]);
        }else{
            var check_if_user_exists = await pool.query("select email from DISTRIBUTOR where email=$1",[email]);
        }
        if(check_if_user_exists.rowCount!=0){
            res.status(404).json({errors:"Account already exists"})
            return;
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        if(type=="donar"){
            var user_signup = await pool.query("insert into DONAR (email,password) values ($1,$2)", [email,hash])
        }else{
            var user_signup = await pool.query("insert into DISTRIBUTOR (email,password) values ($1,$2)", [email,hash])
        }
        // console.log(user_signup);
        res.status(201).json({
            user: '1'
        });
    }
    catch(e){
        res.status(500).json({
            errors: ' Invalid values'
        });
    }
}

async function login (req,res) {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()[1].msg});
        }
        const {email,password,type} = req.body;
        if(type=="admin"){
            var check_if_user_exists = await pool.query("select email from ADMINTABLE where email=$1",[email]);
        }
        else if(type=="donar"){
            var check_if_user_exists = await pool.query("select email from DONAR where email=$1",[email]);
        }else{
            var check_if_user_exists = await pool.query("select email from DISTRIBUTOR where email=$1",[email]);
        }
        if(check_if_user_exists.rowCount!=0){
            if(type=="admin"){
                var hash_password = await pool.query("select password from ADMINTABLE where email=$1", [email]);
            }
            else if(type=="donar"){
                var hash_password = await pool.query("select password from DONAR where email=$1", [email]);
            }else{
                var hash_password = await pool.query("select password from DISTRIBUTOR where email=$1", [email]);
            }
            
            const hash_password_string = hash_password.rows[0].password
            const validPassword = await bcrypt.compare(password, hash_password_string);
            const token = await JWT.sign({
                email:email,
                type:type
            }, 'somesecret')
            if(!validPassword){
                return res.status(400).json({errors:'Invalid Password'})
            }
            else{
                res.cookie('token', token, {
                    maxAge: 3600000,
                    httpOnly: true,
                    path:"/"
                })
                res.status(201).json({
                    user: '1'
                });
            }
        }
        else{
            res.status(404).json({errors:"Email not registered. Please register yourself"});
            return;
        }
        
    }
    catch(e){
        res.status(500).json({
            errors: ' Invalid email or password'
        });
    }
}

module.exports = {register,login};