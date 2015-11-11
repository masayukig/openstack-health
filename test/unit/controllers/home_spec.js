describe('HomeController', function() {
  beforeEach(function() {
    module('app');
    module('app.controllers');
  });

  var $controller, homeController;
  var mockResponse = {};

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    setUpDefaultHealthServiceResponse();

    var defaultStartDate = new Date();
    var healthService = {
      getRunsGroupedByMetadataPerDatetime: function(key, options) {
        return {
          then: function(callback) { callback(mockResponse); }
        };
      }
    };

    homeController = $controller('HomeController', {
      healthService: healthService,
      startDate: defaultStartDate
    });
  }));

  function setUpDefaultHealthServiceResponse() {
    mockResponse.data = {
      runs: {
        '2015-10-01T20:00:00': {
          'openstack/heat': [
            { fail: 0, pass: 40, skip: 1 }
          ],
          'openstack/keystone': [
            { fail: 1, pass: 3, skip: 0 },
            { fail: 1, pass: 3, skip: 0 },
            { fail: 1, pass: 3, skip: 0 }
          ],
          'openstack/tempest': [
            { fail: 0, pass: 1149, skip: 119 },
            { fail: 0, pass: 40, skip: 1 },
            { fail: 1, pass: 6, skip: 0 }
          ]
        }
      }
    };
  }

  it('should process chart data correctly', function() {
    var expectedChartData = [{
      key: 'Passes',
      values: [{
        x: 1443729600000,
        y: 3 }
      ],
      color: 'blue' }, {
        key: 'Failures',
        values: [{
          x: 1443729600000,
          y: 4 }
        ],
        color: 'red'
      }
    ];
    expect(homeController.chartData).toEqual(expectedChartData);
  });

  it('should sort projects by descending percentage of failures', function() {
    var sortedProjects = homeController.projects.map(function(p) { return p.name; });
    expect(sortedProjects[0]).toEqual('openstack/keystone');
    expect(sortedProjects[1]).toEqual('openstack/tempest');
    expect(sortedProjects[2]).toEqual('openstack/heat');
  });

  it('should process chart data rate correctly', function() {
    var expectedChartDataRate = [{
      key: '% Failures',
      values: [{
        x: 1443729600000,
        y: 0.5714285714285714
      }]
    }];
    expect(homeController.chartDataRate).toEqual(expectedChartDataRate);
  });

  it('should calculate the total number of passes and failures', function() {
    mockResponse.data = {
      runs: {
        '2015-10-01T20:00:00': {
          'openstack/tempest': [
            { fail: 0, pass: 1149, skip: 119 },
            { fail: 0, pass: 40, skip: 1 },
            { fail: 1, pass: 6, skip: 0 }
          ]
        }
      }
    };
    homeController.loadData();

    var project = homeController.projects[0];
    expect(project.name).toEqual('openstack/tempest');
    expect(project.data).toContain({ key: 'Passes',   value: 2, color: 'blue' });
    expect(project.data).toContain({ key: 'Failures', value: 1, color: 'red' });
  });
});
