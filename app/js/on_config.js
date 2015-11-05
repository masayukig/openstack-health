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
      title: 'Home',
      resolve:  /*@ngInject*/ {
        "startDate": function($stateParams) {
          return new Date();
        }
      }
    })
    .state('project', {
      url: '/project/*projectName',
      controller: 'ProjectController as project',
      templateUrl: 'project.html',
      title: 'Project',
      resolve: /*@ngInject*/ {
        "projectName": function($stateParams) {
          return $stateParams.projectName;
        },
        "startDate": function($stateParams) {
          return new Date();
        }
      }
    })
    .state('tests', {
      url: '/tests',
      controller: 'TestsController as tests',
      templateUrl: 'tests.html',
      title: 'Tests'
    })
    .state('job', {
      url: '/job/:jobName',
      controller: 'JobController as job',
      templateUrl: 'job.html',
      title: 'Job',
      resolve: {
        "jobName": function($stateParams) {
          return $stateParams.jobName;
        }
      }
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
