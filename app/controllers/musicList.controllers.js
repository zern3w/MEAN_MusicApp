import MusicListController from './MusicListController';
import FavoriteListController from './FavoriteListController';
import MusicController from './MusicController';

var moduleName = 'musicList.controllers';
angular.module(moduleName, [])
    .controller('musicList.musicListController', MusicListController)
    .controller('musicList.favoriteListController', FavoriteListController)
    .controller('musicList.musicController', MusicController);
export default moduleName;