import MusicListController from './MusicListController';
//FavoriteController.js
class FavoriteListController extends MusicListController {
    constructor($state, $timeout, musicListService, ModalService) {
        super($state, $timeout, musicListService, ModalService);
    }
    //reload music list from api
    reloadMusicList() {
        this._musicListService.getFavoriteMusic().then(musicList => {
            this._musicList = musicList;
        });
    }
}
FavoriteListController.$inject = ['$state', '$timeout', 'musicListService', 'ModalService'];
export default FavoriteListController;