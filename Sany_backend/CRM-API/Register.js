let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.post('/register', jsonParser, async (req, res) => {
    try {

        let name = req.body.name;
        let emailId = req.body.email;
        let password = req.body.password;

        const timestamp = Date.now();
        const date = new Date(timestamp);

        // Pad function to ensure two digits
        const pad = num => String(num).padStart(2, '0');

        const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

        console.log(formattedDate);
        // console.log(name, emailId, password)

        let QUERY = "INSERT INTO sanycbware.sany_users (name, email, password, created_at, updated_at)VALUES(?,?,?,?,?)";
        let VALUES = [name, emailId, password, formattedDate, formattedDate];
        let result = await db.query(QUERY, VALUES);
        console.log("result=>", result);
        res.send({
            code: 200,
            status: "Success",
            message: "User Registered successfully"
        })

    } catch (error) {
        console.log("error", error);
        res.send({
            code: 500,
            status: "Failes",
            message: error.message

        })
    }
})

module.exports = router;