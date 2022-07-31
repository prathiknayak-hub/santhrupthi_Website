const pool = require('../utils/dbconfig.js');
const jwt=require("jsonwebtoken");

async function fetch_profile(req,res){
    let token = req.cookies.token;
    if(!token){
        res.status(403).json()
        return;
    }
    let result=jwt.verify(token,'somesecret');


    req.body.email=result.email;
    req.body.type=result.type;
    try{
        const email = req.body.email;
        const type  = req.body.type;
        if(type=="admin"){
            var profile_info = await pool.query("select * from ADMINTABLE where email=$1",[email]);
        }
        else if(type=="donar"){
            var profile_info = await pool.query("select * from DONAR where email=$1",[email]);
        }
        else{
            var profile_info = await pool.query("select * from DISTRIBUTOR where email=$1",[email]);
        }
        
        return profile_info.rows;
    }catch(e){

    }
}

async function edit_profile(req,res){
    let token = req.cookies.token;
    if(!token){
        res.status(403).json()
        return;
    }
    let result=jwt.verify(token,'somesecret');

    console.log(result.email);

    req.body.email=result.email;
    req.body.type=result.type;
    try{
        console.log(req.body)
        const email = req.body.email;
        console.log("1")
        const type  = req.body.type;
        console.log("2")
        const fname = req.body.fname;
        console.log("3")
        const lname = req.body.lname;
        console.log("4")
        const phone = req.body.phone;
        console.log("5")
        // const phone = bigInt(phoneno);
        const address = req.body.address;
        console.log("6")
        console.log(req.body.email);
        console.log('hereeee')
        console.log(email);
        console.log(type);
        if(type=="admin"){
            var profile_info = await pool.query("update ADMINTABLE set fname=$1,lname=$2,phone=$3,address=$4 where email=$5",[fname,lname,phone,address,email]);
        }
        else if(type=="donar"){
            var profile_info = await pool.query("update DONAR set fname=$1,lname=$2,phone=$3,address=$4 where email=$5",[fname,lname,phone,address,email]);
        }
        else{
            var profile_info = await pool.query("update DISTRIBUTOR set fname=$1,lname=$2,phone=$3,address=$4 where email=$5",[fname,lname,phone,address,email]);
        }
        
        console.log('hereee')
    }catch(e){
        console.log("ERROR FOUND")
    }
}


module.exports = {fetch_profile,edit_profile};