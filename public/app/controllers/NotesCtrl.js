angular.module('NotesController', []).controller('NotesController', ["$scope", "$rootScope", "User","Notes","User", function($scope, $rootScope, User ,Notes,User) {

	$scope.notesDataArray=[];
	$scope.editorEnabled = false;

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

	$scope.enableEditor = function(noteData) {
		$scope.checkEditId=noteData.id;
		$scope.editorEnabled = true;
		$scope.editableBody = noteData.body;
	};

	$scope.disableEditor = function() {
		$scope.editorEnabled = false;
	};

	$scope.save = function(noteData) {
		Notes.saveNotes(noteData)
			.then(function (response) {
				if(response.success){
					init();
				}
			})
		$scope.disableEditor();
	};
	
	$scope.addNotes=function () {
		Notes.addNotes($scope.noteFormData)
			.then(function (response) {
				$scope.notesDataArray.push(response);
				$scope.noteFormData=angular.copy(noteDefaultData);
		})
	};

	$scope.deleteNotes=function (noteId) {
		Notes.deleteNotes(noteId)
			.then(function (response) {
			 if(response.success){
				 init();
			 }
			})
	}

	$scope.logout=function () {
		User.logout();
	}
	
}]);