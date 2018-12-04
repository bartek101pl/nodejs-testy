var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/szukaj', async function (req, res, next) {
    console.log("szukaj");
    console.log(req.query.text);  
    res.render('szukaj');
});
module.exports = router;