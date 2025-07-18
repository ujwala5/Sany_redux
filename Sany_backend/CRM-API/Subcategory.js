let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();


router.get('/subcategories', async (req, res) => {

    let query = "Select a.catname,b.subcatid,b.catid,b.subcatname,b.subcatstatus from sany_prod_categories AS a ,sany_prod_subcategories AS b where a.catid = b.catid";
    let showlist_1 = await db.query(query);
    // console.log({ showlist_1 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_1[0]
    });
});

router.get('/subCategory/:subCatId', async (req, res) => {
    let subcatid = req.params.subCatId;
    // console.log({ subcatid });
    let query = "SELECT * FROM sany_prod_subcategories WHERE subcatid = ?";
    let value = [subcatid];
    let showlist_1 = await db.query(query, value);
    // console.log({ showlist_1 });
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: showlist_1[0]
    });
})

router.post('/subcategories/create', jsonParser, async (req, res) => {

    let SubCategoryname = req.body.SubCategoryname;
    let Categoryname = req.body.Categoryname;
    console.log({ Categoryname });

    let query1 = "Select catid from sany_prod_categories where catname = ?"
    let fetchcatid = await db.query(query1, [Categoryname]);
    console.log('fetchcatid ============>' + JSON.stringify(fetchcatid));
    let Catid = fetchcatid[0][0].catid;
    console.log('Catid ============>' + JSON.stringify(Catid));

    let query = "Insert into sany_prod_subcategories(catid,subcatname,subcatstatus) values (?,?,?)";
    let insertsubcategories = await db.query(query, [Catid, SubCategoryname, 1]);
    console.log({ insertsubcategories });

    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Subcategory Info Inserted Successfully'
    });
});

router.put('/subcategories/edit', jsonParser, async (req, res) => {

    let Categoryname = req.body.Categoryname;
    let SubCategoryname = req.body.SubCategoryname;
    let SubCategorystatus = req.body.SubCategorystatus;
    let SubCategoryid = req.query.SubCategoryid;
    // let Substatus = req.body.Substatus;


    let query1 = "Select catid from sany_prod_categories where catname = ?"
    let fetchcatid = await db.query(query1, [Categoryname]);
    console.log('fetchcatid ============>' + JSON.stringify(fetchcatid));
    let Catid = fetchcatid[0][0].catid;
    console.log('Catid ============>' + JSON.stringify(Catid));

    let query = "Update sany_prod_subcategories set catid = ?, subcatname = ? , subcatstatus = ? where subcatid = ?";
    let updatesubcategories = await db.query(query, [Catid, SubCategoryname, SubCategorystatus, SubCategoryid]);
    console.log(updatesubcategories);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Subcategory Info Updated Successfully'
    });
});

router.delete('/subcategories/delete', jsonParser, async (req, res) => {

    let SubCategoryid = req.query.SubCategoryid;

    let query = "DELETE FROM sany_prod_subcategories WHERE subcatid = ?";
    let subcategoriesdelete = await db.query(query, [SubCategoryid]);
    console.log(subcategoriesdelete);
    res.send({
        code: 200,
        status: "SUCCESS",
        type: 'text',
        data: 'Subcategory Info Deleted Successfully'
    });
});


module.exports = router;