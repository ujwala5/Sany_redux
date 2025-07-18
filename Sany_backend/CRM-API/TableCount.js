let express = require('express');
let router = express.Router();
let db = require('../database/db');
let async = require('async');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/tableCount', async (req, res) => {
    try {
        const query = `
            SELECT 'sany_prod_subcategories' AS table_name, COUNT(*) AS row_count FROM sany_prod_subcategories
            UNION ALL
            SELECT 'sany_prod_models', COUNT(*) FROM sany_prod_models
            UNION ALL
            SELECT 'sany_prod_categories', COUNT(*) FROM sany_prod_categories
            UNION ALL
            SELECT 'sany_dealers', COUNT(*) FROM sany_dealers`;

        const showCount = await db.query(query);

        const result = {};
        showCount[0].forEach(row => {
            result[row.table_name] = row.row_count;
        });

        res.send({
            code: 200,
            status: "SUCCESS",
            type: 'text',
            data: result
        })
    } catch (err) {
        res.send({
            code: 500,
            status: "FAILED",
            type: 'text',
            data: err.message
        })
    }
})

module.exports = router;

