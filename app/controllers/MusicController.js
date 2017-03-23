class MusicController {
    constructor(music, title, $timeout, musicListService, close) {
        this.title = title;
        this.music = {
            _id: music._id,
            title: music.title,
            author: music.author,
            munites: Math.floor(music.lengthInSeconds / 60),
            seconds: music.lengthInSeconds % 60,
            favorite: music.favorite
        };
        this._timeout = $timeout;
        this._musicListService = musicListService;
        this._close = close;
    }
    ok() {
        if (this.music == {}) {
            return;
        }
        this.music.lengthInSeconds = this.music.munites * 60 + this.music.seconds;
        this._close(this.music, 500);
    }
    cancel() {}
}
MusicController.$inject = ['music', 'title', '$timeout', 'musicListService', 'close'];
export default MusicController;