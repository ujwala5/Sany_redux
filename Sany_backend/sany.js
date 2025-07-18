let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let cors = require('cors');
app.use(cors());

let dotenv = require('dotenv')
dotenv.config();


let Checkwanum = require('./routes/checkwanum');
let Categorylist = require('./CRM-API/Category');
let SubCategorylist = require('./CRM-API/Subcategory');
let Models = require('./CRM-API/Models');
let Dealers = require('./CRM-API/Dealers');
let Customer = require('./CRM-API/Customers');
let Login = require('./CRM-API/Login');
let Register = require('./CRM-API/Register');
let Count = require('./CRM-API/TableCount')

app.use('/v2', Checkwanum);
app.use('/v2', Categorylist);
app.use('/v2', SubCategorylist);
app.use('/v2', Models);
app.use('/v2', Dealers);
app.use('/v2', Customer);
app.use('/v2', Login);
app.use('/V2', Register);
app.use('/V2', Count)


app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(function (req, res, next) {
//   next(createError(404));
// });



app.listen(8991, function () {
  console.log('SANY SERVICE RUNNING ON PORT $ 8991 $');
});


module.exports = app; 