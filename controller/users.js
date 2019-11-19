const express = require('express');
const router = express.Router();

module.exports = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password field must be at least 8 character long ').isLength({ min: 8, max: 30 });

    let errors = req.validationErrors();


    if (errors) {
        res.send(errors).status(400);
        // res.render('signup', {
        //     errors: errors
        // });
    } else {
        const {firstName, lastName, email} = req.body;
        if(req.body.subscribe) {
            res.send(`Hello ${firstName} ${lastName} Thank You for signing up. Your account is now created.
You would be receiving our periodic newsletters to your email ${email}`).status(200);
        } else {
            res.send(`Hello ${firstName} ${lastName} Thank You for signing up. Your account is now created.`).status(200);
        }
    }
}