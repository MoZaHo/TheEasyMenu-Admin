//endpoint = "http://localhost/TheEasyMenu-Backend/";
endpoint = "http://localhost/CoderSet/TheEasyMenu-Backend/";

var theeasymenu = angular.module('theeasymenu', ['ngRoute','monospaced.qrcode','ngMd5']);

theeasymenu.config(function($routeProvider) {


	$routeProvider

		.when('/',{
			templateUrl : '../assets/pages/dashboard.html',
			controller : 'dashboard'
		})

		.when('/restaurant/:restaurantid',{
			templateUrl : '../assets/pages/restaurant.html',
			controller : 'restaurant'
		})

		.when('/restaurant/:restaurantid/:branchid',{
			templateUrl : '../assets/pages/branch.html',
			controller : 'branch'
		})

	;

});

theeasymenu.controller('dashboard', function($scope , DataService) {
	  $scope.title = "Dashboard";

	  $scope.restaurants = {};

	  $scope.$on('GetRestaurantSuccess',function(event , data) {
		  $scope.restaurants = data.data.data;
	  });

	  $scope.DashboardGetRestaurants = function() {

		  DataService.get(
				  'restaurants-dashboard',
				  endpoint + 'restaurant/get',
				  {},
				  'GetRestaurantSuccess',
				  'GetRestaurantSuccess',
				  true,
				  0
		  );

	  };

	  $scope.DashboardGetRestaurants();

});

theeasymenu.controller('restaurant', function($scope , DataService , $routeParams) {

	  $scope.title = "Restaurant";

	  $scope.restaurant = {};
	  $scope.branches = {};

	  $scope.$on('GetBranchesSucess',function(event , data) {
		  $scope.branches = data.data.data;
	  });

	  $scope.GetBranches = function() {

		  DataService.get(
				  'branches-dashboard',
				  endpoint + 'branch/get',
				  {'restaurant_id' : $routeParams.restaurantid},
				  'GetBranchesSucess',
				  'GetBranchesSucess',
				  true,
				  0
		  );

	  };

	  $scope.$on('GetRestaurantSucess',function(event , data) {
		  $scope.restaurant = data.data.data[0];
	  });

	  $scope.GetRestaurant = function() {

		  DataService.get(
				  'restaurants-dashboard',
				  endpoint + 'restaurant/get',
				  {'restaurant_id' : $routeParams.restaurantid},
				  'GetRestaurantSucess',
				  'GetRestaurantSucess',
				  true,
				  0
		  );

	  };

	  $scope.$on('GetMenusSuccess',function(event , data) {
		  $scope.menus = data.data.data;
	  });

	  $scope.GetMenus = function() {

		  DataService.get(
				  'restaurant_menus',
				  endpoint + 'menu/list',
				  {'restaurant_id' : $routeParams.restaurantid},
				  'GetMenusSuccess',
				  'GetMenusSuccess',
				  true,
				  0
		  );

	  };

	  $scope.GetBranches();
	  $scope.GetRestaurant();
	  //$scope.GetMenus();


});

theeasymenu.controller('branch', function($scope , DataService , $routeParams , $timeout , md5) {

	$scope.view = '3';
	$scope.areaview = '0';

	$scope.floorplan = [];

	$scope.floorplanid = 1;
	$scope.tableid = 1;
	
	
	
	/************************************************************************************************************************/
	/** Sections and menu items **/
	/************************************************************************************************************************/
	$scope.menus = {};
	$scope.newmenu = {};
	$scope.selectedmenu = {};
	$scope.selectedmenuaction = "Add";
	$scope.selectedmenusection = {};
	$scope.selectedmenusectionaction = "Add";
	
	//Get Menus
	$scope.$on('GetMenuSuccess',function(event,data) {
		$scope.menus = data.data.data;
	});
	
	$scope.GetMenus = function() {
		DataService.get(
			'',
			endpoint + 'menu/get',
			{'restaurant_id' : $routeParams.restaurantid, 'menu_id' : 0 , 'include_menuitems' : true , 'include_picture' : false},
			'GetMenuSuccess',
			'GetMenuSuccess',
			true,
			0
		);
	}
	
	$scope.GetMenus();
	
	//Add new menu
	$scope.SaveMainMenu = function() {
		DataService.get(
			'',
			endpoint + 'menu/add',
			{'restaurant_id' : $routeParams.restaurantid, 'menu' : $scope.newmenu},
			'GetMenusAction',
			'GetMenusAction',
			true,
			0
		);
	}
	
	$scope.$on('GetMenusAction',function(event,data) {
		$scope.GetMenus();
	});
	
	//Add new menu modal
	$scope.ShowMainMenuModal = function() {
		$scope.newmenu = {};
		$scope.newmenu.restaurant_id = $routeParams.restaurantid;
		$scope.newmenu.name = '';
		
		$('#MainMenuModal').modal({
			  keyboard: true
		});
	}
	
	//Get Section and Menu Items by Menu ID
	$scope.$on('GetSectionsSuccess',function(event,data) {
		
	});
	
	$scope.GetSections = function() {
		DataService.get(
			'',
			endpoint + 'table/add',
			{'menu' : $routeParams.restaurantid , 'restaurant_branch_id' : $routeParams.branchid , 'restaurant_branch_area_id' : areaid},
			'GetSectionsSuccess',
			'GetSectionsSuccess',
			true,
			0
		);
	}
	
	$scope.ShowSectionModal = function(selectedSection,action) {
		$scope.selectedsection = selectedSection;
		
		$('#sectionModal').modal({
			  keyboard: true
		});
	}
	
	$scope.$on('SaveSectionSuccess',function(event,data) {
		
	});
	
	$scope.SaveSection = function() {
		DataService.get(
			'',
			endpoint + 'menusection/add',
			{'selectedmenu' : this.selectedmenu , 'menu_section' : $scope.selectedmenusection },
			'SaveSectionSuccess',
			'SaveSectionSuccess',
			true,
			0
		);
	}
	
	/************************************************************************************************************************/
	/** END OF MENUS **/
	/************************************************************************************************************************/

	$scope.$on('SetTableSucess',function(event,data) {
		$scope.GetAreasByBranch();
	});

	$scope.AddTableToArea = function(areaid) {
		DataService.get(
				  '',
				  endpoint + 'table/add',
				  {'restaurant_id' : $routeParams.restaurantid , 'restaurant_branch_id' : $routeParams.branchid , 'restaurant_branch_area_id' : areaid},
				  'SetTableSucess',
				  'SetTableSucess',
				  true,
				  0
		  );
	}

	/** AREAS **/
	$scope.$on('GetAreaSucess',function(event,data) {
		$scope.floorplan = data.data.data;
	});

	$scope.GetAreasByBranch = function() {
		DataService.get(
				  '',
				  endpoint + 'area/get',
				  {'restaurant_id' : $routeParams.restaurantid , 'restaurant_branch_id' : $routeParams.branchid , 'include_tables' : true},
				  'GetAreaSucess',
				  'GetAreaSucess',
				  true,
				  0
		  );
	}

	$scope.$on('SetAreaSucess',function(event,data) {
		$scope.GetAreasByBranch();
	});

	$scope.AddAreaToFloorplan = function() {

		DataService.get(
				  '',
				  endpoint + 'area/add',
				  {'restaurant_id' : $routeParams.restaurantid , 'restaurant_branch_id' : $routeParams.branchid},
				  'SetAreaSucess',
				  'SetAreaSucess',
				  true,
				  0
		  );
	}

	$scope.selectedtable = {};

	$scope.DeleteTable = function() {
		console.log("Delete?");
		DataService.get(
				  '',
				  endpoint + 'table/del',
				  {'table' : $scope.selectedtable},
				  'SetTableSucess',
				  'SetTableSucess',
				  true,
				  0
		  );

		$scope.selectedtable = {};
	}

	$scope.SaveTableEdit = function() {

		DataService.get(
				  '',
				  endpoint + 'table/set',
				  {'table' : $scope.selectedtable},
				  'SetTableSucess',
				  'SetTableSucess',
				  true,
				  0
		  );

		$scope.selectedtable = {};
	}

	$scope.DeleteArea = function() {
		DataService.get(
				  '',
				  endpoint + 'area/del',
				  {'area' : $scope.selectedarea},
				  'SetAreaSucess',
				  'SetAreaSucess',
				  true,
				  0
		  );

		$scope.selectedtable = {};
	}

	$scope.SaveAreaEdit = function() {
		DataService.get(
				  '',
				  endpoint + 'area/set',
				  {'area' : $scope.selectedarea},
				  'SetAreaSucess',
				  'SetAreaSucess',
				  true,
				  0
		  );

		$scope.selectedarea = {};
	}

	$scope.ShowAreaModal = function(a) {
		$scope.selectedarea = a;

		$('#areaModal').modal({
			  keyboard: true
		});
	}

	$scope.ShowTableModal = function(t) {

		$scope.selectedtable = t;

		$scope.selectedtable.hashed = md5.createHash($scope.restaurant.id + "-" + $scope.branches[0].id + "-" + $scope.selectedtable.id);

		$('#tableModal').modal({
			  keyboard: true
		});

	}

	$scope.GetAreasByBranch();

	$scope.editwaitor = {
		id : 0,
		name : '',
		surname : '',
		email : '',
		telephone : '',
		id_number : ''
	};
	$scope.saveeditwaitor = false;

	$scope.loading = false;
	$scope.title = "Restaurant";

	$scope.staff = {};
	$scope.restaurant = {};
	$scope.branches = {};
	$scope.branchesbkp = {};

	  $scope.$on('GetBranchesSucess',function(event , data) {
		  $scope.branches = data.data.data;
		  $scope.branchesbkp = data.data.data;
	  });

	  $scope.GetBranches = function() {

		  DataService.get(
				  'branches-dashboard',
				  endpoint + 'branch/get',
				  {'restaurant_id' : $routeParams.restaurantid , 'restaurant_branch_id' : $routeParams.branchid},
				  'GetBranchesSucess',
				  'GetBranchesSucess',
				  true,
				  0
		  );

	  };

	  $scope.$on('GetRestaurantSucess',function(event , data) {
		  $scope.restaurant = data.data.data[0];
		  $scope.GetBranches();

	  });

	  $scope.GetRestaurant = function() {

		  DataService.get(
				  'restaurants-dashboard',
				  endpoint + 'restaurant/get',
				  {'restaurant_id' : $routeParams.restaurantid},
				  'GetRestaurantSucess',
				  'GetRestaurantSucess',
				  true,
				  0
		  );

	  };

	  $scope.$on('GetMenusSuccess',function(event , data) {
		  //$scope.menus = data.data.data;
		  $scope.GetStaff();
	  });

	  $scope.GetRestaurant();


	  $scope.saveCounter = 1;
	  $scope.saving = "";

	  $scope.$on('SetBranchSuccess',function() {
		  $scope.saving = "Changes Saved";
		  $timeout(function() {
			  $scope.saving = "";
		  },1000);
	  });

	  $scope.SaveSettings = function(timeout = 1000) {
		  $timeout(function() {
			  if ($scope.saveCounter > 1) {
				  $scope.saving = "Saving...";

				  DataService.get(
						  '',
						  endpoint + 'branch/set',
						  {'branch' : JSON.stringify($scope.branches[0])},
						  'SetBranchSuccess',
						  'SetBranchSuccess',
						  true,
						  0
				  );

			  } else {
				  $scope.saveCounter++;
				  $scope.SaveSettings();
			  }
		  },timeout);
	  }

	$scope.$on('GetStaffSuccess',function(event,data) {
		$scope.staff = data.data.data;
	});

	$scope.GetStaff = function() {
		DataService.get(
			'staff',
			endpoint + 'staff/get',
			{'restaurant' : $scope.restaurant.id , 'branch' : $scope.branches[0].id},
			'GetStaffSuccess',
			'GetStaffSuccess',
			true,
			0
		);
	}

	$scope.SetEditStaff = function(s) {
		if (s != 0) {
			$scope.editwaitor = s;
		} else {
			$scope.editwaitor = {
					id : 0,
					name : '',
					surname : '',
					email : '',
					telephone : '',
					id_number : ''
				};
		}

		$('#myModal').modal({
			  keyboard: false
			});

	};

	$scope.$on('SaveEditWaitorSuccess',function(event,data) {
		$scope.saveeditwaitor = false;
		$scope.GetStaff();
		$('#myModal').modal('hide');
	});

	$scope.SaveEditWaitor = function() {
		$scope.saveeditwaitor = true;
		DataService.get(
				'staff',
				endpoint + 'staff/set',
				{staff : $scope.editwaitor},
				'SaveEditWaitorSuccess',
				'SaveEditWaitorSuccess',
				true,
				0
			);

	};




});

theeasymenu.service('DataService',['$window','$http','$rootScope',function($window , $http , $rootScope) {

	var _this = this;
	var _maxRetryCount = 5; //Just have a maxRetryCount

	this.get = function(localname , endpoint , input , success_cb , failed_cb , skip_cache , retries) {

		retries = angular.isUndefined(retries) ? _maxRetryCount : retries;

		var h = { 'Content-Type': 'application/json' };

		if (!skip_cache) {

			if (localStorage.getItem(localname) == null) {
				skip_cache = true;
			} else {

				//If we have the data, but we feel that this data is to old, we should rather go fetch from the server...
				// TODO : make session timeout variable

				$rootScope.$broadcast(success_cb,{
        			'success': true,
        			'data': JSON.parse(localStorage.getItem(localname))
        		});

				skip_cache = false;

			}

		}

		if (skip_cache) {
			$http.post(endpoint, input, { headers: h }).
	        	then(function(response) {

	        		//save to cache for use later

	        		if (localname != '') {
	        			localStorage.setItem(localname,JSON.stringify(response.data));
	        		}

	        		$rootScope.$broadcast(success_cb,{
	        			'success': true,
	        			'data': response.data
	        		});

	        	}, function(response) {



	        		if(retries) {
	                    return _this.get(localname , endpoint , input , success_cb , failed_cb , skip_cache, --retries); //here we are returning the promise
	                 }

	        		$rootScope.$broadcast(failed_cb,{
	        			'success': false,
	        			'data': response.data
	        		});

	        	}

	        );

		};
	}

	this.setlocal = function(name,value) {
		localStorage.setItem(name,value);
	};

	this.getlocal = function(name) {
		return localStorage.getItem(name);
	}

	this.clearCache = function() {
		localStorage.clear();
	}


}]);
