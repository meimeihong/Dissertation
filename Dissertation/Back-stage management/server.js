const express = require('express'); //第三方插件
const app = express();
const bodyParser = require('body-parser'); //post解析
const db = require('./src/router/dbconnect.js') //链接数据库
const path = require('path');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(express.static(path.join(__dirname, './src/html')));
const user = require('./src/router/user.js');
const goods = require('./src/router/goods.js');
const upload = require('./src/router/upload.js');
const shoppingcart=require('./src/router/shoppingcart.js');
const Customer = require('./src/router/Customer.js');
const admin = require('./src/router/Admin.js');
const shoppinglist = require('./src/router/shoppinglist.js');
app.use('/api/user', user);
app.use('/api/goods', goods);
app.use('/api/upload', upload);
app.use('/api/Customer', Customer);
app.use('/api/admin', admin);
app.use('/api/cart', shoppingcart);
app.use('/api', shoppinglist);
app.listen(3009, function() {
	console.log('链接成功');
})