let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/showdealers', async (req, res) => {

    let query = "SELECT * FROM sany_dealers";
    let showlist_3 = await db.query(query);
    // console.log({ showlist_3 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_3[0]
    });
});

router.get('/showDealerById/:id', async (req, res) => {

    let dealerId = req.params.id;
    let query = "SELECT * FROM sany_dealers WHERE dealerid=?";
    let showlist_3 = await db.query(query, [dealerId]);
    console.log({ showlist_3 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_3[0]
    });
})

router.post('/dealers/create', jsonParser, async (req, res) => {

    // let Dealercode = req.query.Dealercode;
    let Dealername = req.body.Dealername;
    let Dealercode = req.body.Dealercode;
    let Contactno = req.body.Contactno;
    let Country = req.body.Country;
    let State = req.body.State;
    let City = req.body.City;
    let lat = req.body.lat;
    let long = req.body.long;
    let Zipcode = req.body.Zipcode;
    let Mapadd = req.body.Mapadd;
    console.log({ Mapadd });



    let query = "Insert into sany_dealers(dealercode, dealername, contactno,country,state,city,lat,lon,zipcode,mapaddr) values(?,?,?,?,?,?,?,?,?,?)";
    let insertdealers = await db.query(query, [Dealercode, Dealername, Contactno, Country, State, City, lat, long, Zipcode, Mapadd]);
    console.log({ insertdealers });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Dealer Info Inserted Successfully'
    });
});

router.put('/dealers/edit', jsonParser, async (req, res) => {

    let Dealercode = req.body.Dealercode;
    let Dealername = req.body.Dealername;
    let Contactno = req.body.Contactno;
    let Country = req.body.Country;
    let State = req.body.State;
    let City = req.body.City;
    let lat = req.body.lat;
    let long = req.body.long;
    let Zipcode = req.body.Zipcode;
    let Mapadd = req.body.Mapadd;
    let Dealerid = req.query.Dealerid;

    let query = "Update sany_dealers set dealercode = ?, dealername = ? , contactno = ?,country = ?,state = ?,city = ?,lat = ?,lon = ?,zipcode = ?,mapaddr = ?  where dealerid = ?";
    let updatedealers = await db.query(query, [Dealercode, Dealername, Contactno, Country, State, City, lat, long, Zipcode, Mapadd, Dealerid]);
    console.log(updatedealers);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Dealer Info Updated Successfully'
    });
});

router.delete('/dealers/delete', jsonParser, async (req, res) => {

    let Dealerid = req.query.Dealerid;

    let query = "DELETE FROM sany_dealers WHERE dealerid = ?";
    let modeldelete = await db.query(query, [Dealerid]);
    console.log(modeldelete);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Dealer Info Deleted Successfully'
    });
});

module.exports = router;