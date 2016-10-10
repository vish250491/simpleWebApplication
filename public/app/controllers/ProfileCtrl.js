angular.module('ProfileController', []).controller('ProfileController', ["$scope", "$rootScope", "User", function($scope, $rootScope, User) {

	$scope.profileData = {
		email: $rootScope.loggedInUser.email
	};
	
}]);