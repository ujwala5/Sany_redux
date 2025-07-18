let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/showmodels', async (req, res) => {

    let query = "Select a.subcatname,b.subcatid,b.modelid,b.modelcode,b.modeldesc,b.brochureurl,b.mstatus from sany_prod_subcategories AS a,sany_prod_models AS b where a.subcatid = b.subcatid;";
    let showlist_2 = await db.query(query);
    // console.log({ showlist_2 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_2[0]
    });
});

router.get('/showModels/:id', async (req, res) => {
    let modelId = req.params.id;
    console.log({ modelId })
    let query = "select * from sany_prod_models WHERE modelid=?";
    let values = [modelId]
    let showlist_2 = await db.query(query, values);
    console.log({ showlist_2 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_2[0]
    });
})


router.post('/models/create', jsonParser, async (req, res) => {

    let Subcatname = req.body.Subcatname;
    let Modelcode = req.body.Modelcode;
    let Modeldesc = req.body.Modeldesc;
    let Brochureurl = req.body.Brochureurl;


    let query_1 = "Select count(1) as c from sany_prod_models where modelcode = ?"
    let result = await db.query(query_1, [Modelcode]);

    if (result[0][0].c > 0) {
        res.send({
            code: 100,
            status: "FAILED",
            data: 'This Modelcode Name Already Exists'
        });
    } else {

        let query1 = "Select subcatid from sany_prod_subcategories where subcatname = ?"
        let fetchsubcatid = await db.query(query1, [Subcatname]);
        console.log('fetchsubcatid ============>' + JSON.stringify(fetchsubcatid));
        let Subcatid = fetchsubcatid[0][0].subcatid;
        console.log('Subcatid ============>' + JSON.stringify(Subcatid));

        let query = "Insert into sany_prod_models(subcatid,modelcode,modeldesc,brochureurl,mstatus) values (?,?,?,?,?)";
        let insertmodels = await db.query(query, [Subcatid, Modelcode, Modeldesc, Brochureurl, 1]);
        console.log({ insertmodels });
        res.send({
            code: 200,
            status: "SUCCESS",
            type: 'text',
            data: 'Models Record Inserted Successfully'
        });
    }
});

router.put('/models/edit', jsonParser, async (req, res) => {

    // let Subcatid = req.body.Subcatid;
    let Subcatname = req.body.Subcatname;
    let Modelcode = req.body.Modelcode;
    let Modeldesc = req.body.Modeldesc;
    let Brochureurl = req.body.Brochureurl;
    let Modelstatus = req.body.Modelstatus;
    // let Subcatname = req.body.Subcatname;
    let Modelid = req.query.Modelid;


    let query1 = "Select subcatid from sany_prod_subcategories where subcatname = ?"
    let fetchsubcatid = await db.query(query1, [Subcatname]);
    console.log('fetchsubcatid ============>' + JSON.stringify(fetchsubcatid));
    let Subcatid = fetchsubcatid[0][0].subcatid;
    console.log('Subcatid ============>' + JSON.stringify(Subcatid));


    let query = "Update sany_prod_models set subcatid = ?, modelcode = ? , modeldesc = ?,brochureurl = ?,mstatus = ? where modelid = ?";
    let updatemodels = await db.query(query, [Subcatid, Modelcode, Modeldesc, Brochureurl, Modelstatus, Modelid]);
    console.log(updatemodels);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Model Record Updated Successfully'
    });
});

router.delete('/models/delete', jsonParser, async (req, res) => {

    let Modelid = req.query.Modelid;

    let query = "DELETE FROM sany_prod_models WHERE modelid = ?";
    let modeldelete = await db.query(query, [Modelid]);
    console.log(modeldelete);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Model Record Deleted Successfully'
    });
});

module.exports = router;