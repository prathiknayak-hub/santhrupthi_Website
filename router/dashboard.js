const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard');


router.get('/',async(req,res) => {
    let type=await dashboard.fetch_type(req,res);
    res.render('dashboard', { layout: false,type:type })
});
router.post('/',async (req,res) =>{ 
    dashboard.insert_item(req,res);
    let type=await dashboard.fetch_type(req,res);
    res.render('dashboard', { layout: false,type:type})
})

module.exports = router;