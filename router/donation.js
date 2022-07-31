const express = require('express');
const router = express.Router();
const donation = require('../controllers/donation');
const dashboard = require('../controllers/dashboard');


router.get('/',async (req,res) =>{ 
    const donations = await donation.fetch_donated(req,res)
    let type=await dashboard.fetch_type(req,res);
    console.log(123,donations);
    res.render('donation', { layout: false,donations:donations,type:type})
})

router.post('/',async (req,res)=>{
    await donation.insert_donated(req,res)
    const donations = await donation.fetch_donated(req,res)
    let type=await dashboard.fetch_type(req,res);
    res.render('donation', { layout: false,donations:donations,type:type})
})


module.exports = router;