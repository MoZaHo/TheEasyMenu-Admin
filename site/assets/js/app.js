
var theeasymenu = angular.module('theeasymenu', ['ngRoute']);

theeasymenu.config(function($routeProvider) {
	
	$routeProvider
	
		.when('/',{
			templateUrl : '../assets/pages/dashboard.html',
			controller : 'dashboard'
		})
	
	;
	
});
  
theeasymenu.controller('dashboard', function($scope) {
	  $scope.title = "asdf";
});