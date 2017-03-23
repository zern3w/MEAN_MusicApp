var express = require('express');
var app = express();
var musicDBApi = require('./server/musicDBApi');
var bodyParser = require('body-parser');
app.use('/public', express.static('bower_components'));
app.use(express.static('app'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//API
app.get('/api/music', function (request, response) {
    musicDBApi.getAllMusic(result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.get('/api/favoriteMusic', function (request, response) {
    musicDBApi.getMusicByFavorite(true, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.get('/api/music/:id', function (request, response) {
    musicDBApi.getMusic(request.params.id, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.get('/api/isMusicExist/:title', function (request, response) {
    musicDBApi.isMusicExist(request.params.title, result => {
        response.json(result);
    });
});
app.post('/api/music', function (request, response) {
    var newMusic = request.body;
    musicDBApi.addNewMusic(newMusic, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.put('/api/music/:id', function (request, response) {
    var modifiedMusic = request.body;
    musicDBApi.modifyMusic(request.params.id, modifiedMusic, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.put('/api/markFavorite/:id', function (request, response) {
    var newMusic = request.body;
    musicDBApi.modifyFavorite(request.params.id, request.body.favorite, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
app.delete('/api/music/:id', function (request, response) {
    musicDBApi.deleteMusic(request.params.id, result => {
        response.json(result)
    }, error => {
        response.status(500).send(error);
    });
});
//Route
app.get('/', function (request, response) {});
app.listen(8000, function () {
    console.log('Express server started!!!');
});