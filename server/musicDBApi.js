var Music = require('./musicModel');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Musics');
var db = mongoose.connection;
db.once('open', () => console.log('DBConnection connected'));
db.on('error', () => console.log('DBConnection Error'));

function addNewMusic(newMusic, callBack, errorCallBack) {
    var music = new Music({
        title: newMusic.title,
        author: newMusic.author,
        lengthInSeconds: newMusic.lengthInSeconds,
        favorite: false
    });
    music.save(function (err) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        console.log('Music created successfully!');
    });
    callBack(music);
}

function getMusic(id, callBack, errorCallBack) {
    Music.findById(id, function (err, music) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        callBack(music);
    });
}

function getAllMusic(callBack, errorCallBack) {
    Music.find({}, function (err, musics) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        callBack(musics);
    });
}

function getMusicByFavorite(isFavorite, callBack, errorCallBack) {
    Music.find({
        favorite: isFavorite
    }, function (err, musics) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        callBack(musics);
    });
}

function isMusicExist(title, callBack, errorCallBack) {
    Music.find({
        title: title
    }, function (err, musics) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        if (musics.length > 0) {
            console.log('Name exists already');
            callBack(true);
        } else {
            console.log('Name not exists already');
            callBack(false);
        }
    });
}

function modifyMusic(id, modifiedMusic, callBack, errorCallBack) {
    Music.findById(id, function (err, music) {
        if (err) {
            console.log(err);
            errorCallBack(err);
        }
        if (music == {}) {
            return;
        }
        if (modifiedMusic.title != undefined) {
            music.title = modifiedMusic.title;
        }
        if (modifiedMusic.author != undefined) {
            music.author = modifiedMusic.author;
        }
        if (modifiedMusic.lengthInSeconds != undefined) {
            music.lengthInSeconds = modifiedMusic.lengthInSeconds;
        }
        if (modifiedMusic.favorite != undefined) {
            music.favorite = modifiedMusic.favorite;
        }
        if (music == {}) {
            return;
        }
        music.save(function (err) {
            if (err) {
                console.log(err);
                errorCallBack(err);
                return;
            }
            console.log('save modifyMusic ' + music);
            callBack(music);
        });
    });
}

function modifyFavorite(id, isFavorite, callBack, errorCallBack) {
    Music.findById(id, function (err, music) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        if (music == {}) {
            return;
        }
        music.favorite = isFavorite;
        music.save(function (err) {
            if (err) {
                console.log(err);
                errorCallBack(err);
                return;
            }
            console.log('save modifyFavorite ' + music);
            callBack(music);
        });
    });
}

function deleteMusic(id, callBack, errorCallBack) {
    Music.findById(id, function (err, music) {
        if (err) {
            console.log(err);
            errorCallBack(err);
            return;
        }
        if (music == {}) {
            return;
        }
        music.remove(function (err) {
            if (err) {
                console.log(err);
                errorCallBack(err);
                return;
            }
            console.log('deleteMusic ' + music);
            callBack(true);
        });
    });
}
module.exports = {
    addNewMusic: addNewMusic,
    getMusic: getMusic,
    getAllMusic: getAllMusic,
    getMusicByFavorite: getMusicByFavorite,
    modifyMusic: modifyMusic,
    modifyFavorite: modifyFavorite,
    isMusicExist: isMusicExist,
    deleteMusic: deleteMusic
};