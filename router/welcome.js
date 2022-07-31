const express = require('express');
const router = express.Router();

router.get('/',(req,res) => res.render('welcome', { layout: false }));

router.get("/logout", async (req, res) => {
    console.log("hi")
    res.clearCookie('token')
    console.log("Successfully logged out ")
    res.render('welcome', { layout: false })
})

module.exports = router;    