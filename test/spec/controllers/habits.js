'use strict';

describe('Controller: HabitsCtrl', function () {

  // load the controller's module
  beforeEach(module('dripdrankdrunkApp'));

  var HabitsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HabitsCtrl = $controller('HabitsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HabitsCtrl.awesomeThings.length).toBe(3);
  });
});
