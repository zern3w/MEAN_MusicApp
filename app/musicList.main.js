import {
    default as controllersModuleName
} from './controllers/musicList.controllers';
import {
    default as servicesModuleName
} from './musicList.services';
var moduleName = 'musicList';

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: 'templates/home.html',
            controller: 'musicList.musicListController',
            controllerAs: 'vm',
            data: {
                title: "Music List"
            }
        })
        .state('favorite', {
            url: "/favorite",
            templateUrl: 'templates/home.html',
            controller: 'musicList.favoriteListController',
            controllerAs: 'vm',
            data: {
                title: "Favorite List"
            }
        });
}
config.$inject = ['$stateProvider', '$urlRouterProvider'];
var app = angular.module(moduleName, ['ui.router', 'angularModalService', servicesModuleName,
    controllersModuleName
]);
app.config(config);
export default moduleName;