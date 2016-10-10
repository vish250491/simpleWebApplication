angular.module('NotesController', []).controller('NotesController', ["$scope", "$rootScope", "User", function($scope, $rootScope, User) {

	$scope.profileData = {
		email: $rootScope.loggedInUser.email
	};
	
}]);