let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');


router.post('/customer/login', jsonParser, async (req, res) => {
    try {

        let emailId = req.body.emailId;
        console.log("emailId", emailId);

        let password = req.body.password;
        console.log("password", password);

        // console.log(process.env.PRIVATE_KEY);

        // let privateKey = process.env.PRIVATE_KEY;

        let secretKey = "uniqueEmailId";


        let token = jwt.sign({ email_Id: emailId, Password: password }, secretKey, { algorithm: 'HS256' }, { expiresIn: '10s' });
        console.log("token==>>", token);

        let query = "Select * from sanycbware.sany_users where email = ? and password = ?";
        let value = [emailId, password];
        let result = await db.query(query, value);
        console.log("result", result[0][0]);

        if (result[0][0] !== undefined) {
            res.status(200).send({
                code: 200,
                status: "success",
                message: "Login successfully",
                access_token: token
            })

        } else {
            res.send({
                code: 400,
                status: "Failed",
                message: "Invalid creadentials"
            })
        }

        // if (!result[0].email && result[0].email !== emailId) {
        //     res.send({
        //         code: 200,
        //         status: "Failed",
        //         message: "Invalid Email Id"
        //     })
        // } else {
        //     console.log("valid email Id");
        // }

        // if (result[0].password && result[0].password === password) {
        //     res.send({
        //         code: 200,
        //         status: "Success",
        //         message: "Correct Password"
        //     })
        // }

    } catch (error) {
        console.log("error", error);
    }
})

module.exports = router;
