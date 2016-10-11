angular.module('UserService', []).factory('User', function($http, $rootScope, $location) {

	return {

		login: function(username, password) {
			$http.post('/login', {
				username: username,
				password: password
			}).success(function(data) {
				if (data.success == true) {
					$rootScope.loggedInUser = data.user;
					$rootScope.notification.visible = false;
					$location.path('/profile');
				} else {
					$rootScope.$emit('notify', data);
				}
			}).error(function() {
				$rootScope.$emit('notify', { success: 0, message: "Something went wrong. Please try again." });
			});
		},

		register: function(registrationFields) {
			$http.post('/register', registrationFields).success(function(data) {
				if (data.success == true) {
					$rootScope.loggedInUser = data.user;
					$location.path('/profile');
				} else {
					$rootScope.$emit('notify', data);
				}
			});
		},

		logout: function() {
			$http.post('/logout').success(function(data) {

					$location.path('/');
				
			}).error(function() {
				$rootScope.$emit('notify', { success: 0, message: "Something went wrong. Please try again." });
			});
		}


	}

});