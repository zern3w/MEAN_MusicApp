class MusicListController {
    constructor($state, $timeout, musicListService, ModalService) {
        this.title = $state.current.data.title;
        this._timeout = $timeout;
        this._musicListService = musicListService;
        this._ModalService = ModalService;
        this.reloadMusicList();
    }
    //reload music list from api
    reloadMusicList() {
        this._musicListService.getAllMusic().then(musicList => {
            this._musicList = musicList;
        });
    }
    markFavorite(id, isFavorite) {
        return this._musicListService.markFavorite(id, isFavorite)
            .then(() => {
                this.reloadMusicList();
            });
    }
    delete(id) {
        return this._musicListService.delete(id)
            .then(() => {
                this.reloadMusicList();
            });
    }
    showAddModal() {
        this._ModalService.showModal({
            templateUrl: "templates/musicForm.html",
            controller: "musicList.musicController",
            controllerAs: 'vm',
            inputs: {
                music: {},
                title: "Add new music"
            }
        }).then(modal => {
            modal.element.modal();
            modal.close.then((music) => {
                if (music.title == undefined) {
                    return;
                }
                this._musicListService.addMusic(music).then(message => {
                    console.log(message);
                    this.reloadMusicList();
                });
            });
        });
    }
    showEditModal(music) {
        this._ModalService.showModal({
            templateUrl: "templates/musicForm.html",
            controller: "musicList.musicController",
            controllerAs: 'vm',
            inputs: {
                music: music,
                title: "Update music"
            }
        }).then(modal => {
            modal.element.modal();
            modal.close.then((musicResult) => {
                if (musicResult._id == undefined) {
                    return;
                }
                if (music.title == undefined) {
                    return;
                }
                this._musicListService.updateMusicInfo(musicResult._id, musicResult).then(message => {
                    console.log(message);
                    this.reloadMusicList();
                });
            });
        });
    }
    get musicList() {
        return this._musicList;
    }
}
MusicListController.$inject = ['$state', '$timeout', 'musicListService', 'ModalService'];
export default MusicListController;