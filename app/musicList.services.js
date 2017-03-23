var moduleName = 'musicList.services';
class MusicListService {
    constructor($http) {
        this.HTTP = $http;
    }
    getAllMusic() {
        return this.HTTP.get('/api/music').then(result => result.data);
    }
    getFavoriteMusic() {
        return this.HTTP.get('/api/favoriteMusic').then(result => result.data);
    }
    checkIfBookExists(title) {
        return this.HTTP.get("/api/isMusicExist/" + title).then(result => result.data);
    }
    addMusic(music) {
        return this.HTTP.post('/api/music', music);
    }
    markFavorite(id, isFavorite) {
        return this.HTTP.put("/api/markFavorite/" + id, {
            id: id,
            favorite: isFavorite
        });
    }
    updateMusicInfo(id, music) {
        return this.HTTP.put("/api/music/" + id, music);
    }
    delete(id) {
        return this.HTTP.delete("/api/music/" + id).then(result => result.data);
    }
    static musicListFactory($http) {
        return new MusicListService($http);
    }
}
MusicListService.musicListFactory.$inject = ['$http'];
angular.module(moduleName, [])
    .factory('musicListService', MusicListService.musicListFactory);
export default moduleName;