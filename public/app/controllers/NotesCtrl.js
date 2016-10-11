angular.module('NotesController', []).controller('NotesController', ["$scope", "$rootScope", "User","Notes", function($scope, $rootScope, User ,Notes) {

	$scope.notesDataArray=[];
	$scope.profileData = $rootScope.loggedInUser;

	var noteDefaultData={
		subject:'',
		body :'',
		version :1,
		userId :$scope.profileData.userId
	};

	$scope.noteFormData=angular.copy(noteDefaultData);

	/*****************************************************************
	 ***
	 *** get Notes Data on controller load
	 ***
	 ******************************************************************/
	function init(){
	 Notes.getNotes($scope.profileData.userId)
		 .then(function (response) {
		 $scope.notesDataArray=response;
	 })
	}
	init();
	
	$scope.addNotes=function () {
		Notes.addNotes($scope.noteFormData)
			.then(function (response) {
				$scope.notesDataArray.push(response);
				$scope.noteFormData=angular.copy(noteDefaultData);
		})
	}

	$scope.deleteNotes=function (noteId) {
		Notes.deleteNotes(noteId)
			.then(function (response) {
			 if(response.success){
				 init();
			 }
			})
	}
	
}]);