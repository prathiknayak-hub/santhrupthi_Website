const express = require('express');
const router = express.Router();
const profile_list = require('../controllers/profile');
const dashboard = require('../controllers/dashboard');

router.get('/',async (req,res) =>{ 
    let profile = await profile_list.fetch_profile(req,res);
    let type=await dashboard.fetch_type(req,res);
    res.render('profile', { layout: false,profile:profile,type:type })
})

router.post('/',async (req,res) =>{ 
    profile_list.edit_profile(req,res);
    let profile = await profile_list.fetch_profile(req,res);
    let type=await dashboard.fetch_type(req,res);
    res.render('profile', { layout: false,profile:profile ,type:type})
})


module.exports = router;