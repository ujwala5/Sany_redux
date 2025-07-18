let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.get('/showcustomer', async (req, res) => {

    let query = "SELECT * FROM sany_customer_master";
    let showlist_4 = await db.query(query);
    // console.log({ showlist_4 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_4[0]
    });
});

router.post('/customer/create', jsonParser, async (req, res) => {

    let Custcode = req.body.Custcode;
    let Custname = req.body.Custname;
    let Address = req.body.Address;
    let City = req.body.City;
    let Postcode = req.body.Postcode;
    let mobile = req.body.City;
    let Email = req.body.Email;

    let query = "Insert into sany_customer_master(custcode,custname,addr1,city,postcode,mobile,email)values(?,?,?,?,?,?,?)";
    let insertcustomer = await db.query(query, [Custcode, Custname, Address, City, Postcode, mobile, Email]);
    console.log({ insertcustomer });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Customer Info Inserted Successfully'
    });
});

module.exports = router;