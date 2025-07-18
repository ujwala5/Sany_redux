let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


router.post('/checkmobnum', async (req, res) => {

    let wanumber = req.query.wanumber;
    console.log({ wanumber });

    let query = "Select count(1) as c from sany_customer_master where wanumber = ?";
    let waresult = await db.query(query, [wanumber]);

    if (!wanumber) {
        res.send({
            code: 100,
            status: "FAILED",
            data: 'Whatsapp Number is empty.\nPlease type *B* \uD83D\uDC49 to go back'
        });
    } else if (wanumber.length > 12) {
        res.send({
            code: 100,
            status: "FAILED",
            data: 'Please provide a valid mobile number'
        });
    } else if (waresult[0][0].c == 0) {
        res.send({
            code: 100,
            status: "FAILED",
            data: 'The number provided is not available with us.Please contact sany support.\nPlease type *B* \uD83D\uDC49 to go back'
        });
    } else {
        let query = "SELECT * FROM sany_customer_master WHERE wanumber = ? ORDER BY created_at DESC limit 1";
        let result_1 = await db.query(query, [wanumber]);
        let result = result_1[0][0];
        console.log('Checkmobnum==============> ' + JSON.stringify(result));
        res.send({
            code: 200,
            status: "SUCCESS",
            type: 'text',
            data: 'User Found Successfully'
        });
    }
});

module.exports = router;