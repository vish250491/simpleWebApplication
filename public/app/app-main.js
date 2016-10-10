var yourAppName = angular.module('simpleWebApp',
	['ngRoute',
	'ngSanitize',
	'btford.socket-io',
    'appDirectives',
	'appFilters',
	'appRoutes',
    'MainController',
	'UserController',
    'NotesController',
    'MainService',
    'UserService',
	'ValidationService',
	'SocketService'])

.run(['$rootScope', function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = ' My Notes';
        }
    }

    /*****************************************************************
    ***
    *** When the page changes, set the page title and hide any notifications
    ***
    ******************************************************************/

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.page.setTitle('My Notes');
        $rootScope.notification.visible = false;
    });
}])

.run(["$rootScope", "$http", "$window", "$location", function($rootScope, $http, $window, $location){

    /*****************************************************************
    ***
    *** Check session storage to see if user is logged in when app loads
    ***
    ******************************************************************/

    if ( $window.sessionStorage['loggedInUser'] ) {
        $rootScope.loggedInUser = JSON.parse($window.sessionStorage['loggedInUser']);
    } else {
        $rootScope.loggedInUser = false;
    }

	/*****************************************************************
    ***
    *** Set logout function here so it is available globally
    ***
    ******************************************************************/

	$rootScope.logout = function(){

        // Send a message to the server asking to logout
		$http.post('/logout');

        // Set local variables to tell app that user is logged out, both current & in storage
        $rootScope.loggedInUser = false;
        $window.sessionStorage['loggedInUser'] = null;

        // Redirect to the home page
        $location.url('/');
	};

}]);