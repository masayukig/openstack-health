'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController as home',
      templateUrl: 'home.html',
      title: 'Home'
    })
    .state('project', {
      url: '/project/*projectName',
      controller: 'ProjectController as project',
      templateUrl: 'project.html',
      title: 'Project',
      resolve: {
        "projectName": function($stateParams) {
          return $stateParams.projectName;
        }
      }
    })
    .state('tests', {
      url: '/tests',
      controller: 'TestsController as tests',
      templateUrl: 'tests.html',
      title: 'Tests'
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
