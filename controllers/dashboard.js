const pool = require('../utils/dbconfig.js');
const jwt=require("jsonwebtoken");

async function insert_item(req,res){
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
        const type  = req.body.type;
        const Iname = req.body.Iname;
        const Idate = req.body.Idate;
        const Quantity = req.body.Quantity;
        const location = req.body.location;
        const description = req.body.description;
        
        const donarids = await pool.query("select donarid from DONAR where email=$1",[email]);
        console.log(donarids.rows[0].donarid)
        const item_info = await pool.query("insert into ITEM(iname,idescription,idate,ilocation,qty) values($1,$2,$3,$4,$5)",[Iname,description,Idate,location,Quantity]);
        const item_id = await pool.query("select itemid from ITEM");
        console.log('hereeeeeee',item_id.rows[item_id.rows.length-1].itemid);
        const donor_info = await pool.query("insert into DONATION(itemid,donarid) values($1,$2)",[item_id.rows[item_id.rows.length-1].itemid,donarids.rows[0].donarid]);

        console.log('hereee')
    }catch(e){
        console.log("ERROR FOUND")
    }
}

async function fetch_type(req,res){
    let token = req.cookies.token;
    if(!token){
        res.status(403).json()
        return;
    }
    let result=jwt.verify(token,'somesecret');
    return result.type;
}

module.exports = {insert_item,fetch_type};