var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var appDao = require('./dao/AppDAO');
var app = express();

var resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(config.init_port);

console.log("Application is listening on port ", config.init_port);

app.post('/carrinho/add', function (req, res, next) {

    var body = req.body;

    appDao.add_carrinho(body, function (response, code) {
        resp(res, response, code, next)
    
    console.log('Carrinho adicionado')
    })

});
app.get('/carrinho/:id', function (req, res, next) {
    var param = req.params;

    appDao.get_carrinho(param, function (response, code) {
        resp(res, response, code, next)
    })
});
app.put('/carrinho/:id', function (req, res, next) {
    var id = req.params.id;
    var param = req.body;

    appDao.update_carrinho(id, param, function (response, code) {
        resp(res, response, code, next)
    })
s
});
app.delete('/carrinho/:id', function (req, res, next) {
    var id = req.params;
    console.log(id)
    
    appDao.deletar_carrinho(id, function (response, code) {
        resp(res, response, code, next)
    })
});


