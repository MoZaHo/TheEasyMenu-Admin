<!DOCTYPE html>
<html lang="en" ng-app="theeasymenu">

	<head>
		<title></title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		
		<link rel="stylesheet" href="../assets/css/theme.css">
		<link rel="stylesheet" href="../assets/css/styles.css">

		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		
		<script src="//code.angularjs.org/1.5.2/angular.js"></script>
		<script src="//code.angularjs.org/1.5.2/angular-route.js"></script>
		<script src="../assets/js/app.js"></script>
		
	</head>
	
	<body>
	
		<nav class="navbar navbar-default">
  			<div class="container-fluid">
    			<div class="navbar-header">
      				<a class="navbar-brand" href="#">
        				The Easy Menu
      				</a>
    			</div>
  			</div>
		</nav>
		
		<div class="fluid-container">
			
			<div class="row">
				<div class="col-md-12">
					<div class="col-md-2">
	          			<ul class="nav nav-sidebar">
	            			<li><a href="#">Overview</a></li>
	          			</ul>
        			
        			</div>
        		
          			<div class="col-md-10">
          				<div ng-view></div>	
	          		</div>
          		</div>
			</div>
		</div>
		
	</body>

</html>