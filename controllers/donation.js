const pool = require('../utils/dbconfig.js');
const jwt=require("jsonwebtoken");

async function fetch_donated(req,res){
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
        const email = req.body.email;
        const type  = req.body.type;
        
        if(type=="admin" || type=="distributor"){
            var items = await pool.query("select * from ITEM");
        }
        else if(type=="donar"){
            var donarids = await pool.query("select donarid from DONAR where email=$1",[email]);
            console.log(donarids.rows[0].donarid)
            var items = await pool.query("select * from ITEM where itemid in (select itemid from DONATION where donarid=$1)",[donarids.rows[0].donarid]);
        }
        else{

        }

        
        return items.rows;
    }catch(e){

    }
}

async function insert_donated(req,res){
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
        const email = req.body.email;
        const type  = req.body.type;
        const itemid = req.body.itemid;

        console.log("hereeeeeeeeeeeeee")
        const distributorids = await pool.query("select distributorid from DISTRIBUTOR where email=$1",[email]);
        console.log("hereeeeeeeeeeeeee")
        console.log(distributorids)
        console.log(itemid,distributorids.rows[0].distributorid)
        const insert_status = await pool.query("update ITEM set istatus=1 where itemid=$1",[itemid]);
        console.log("hereeeeeeeeeeeeee")
        const insert_distributor = await pool.query("update DONATION set distributorid=$1 where itemid=$2",[distributorids.rows[0].distributorid,itemid]);
        console.log("hereeeeeeeeeeeeee")
        
    }catch(e){

    }
}


module.exports = {fetch_donated,insert_donated}