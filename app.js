const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.engine('html',require('express-art-template'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

app.use(router);
app.listen(12345,()=>{
    console.log('running');
})