const express = require('express');
const router = express.Router();
const signup = require('../controller/users');


// Register Form
router.get('/signup', function (req, res) {
    //   res.render('signup');
    res.send("Signup page").status(200);
});

// Register Proccess
router.post('/signup', signup);




module.exports = router;