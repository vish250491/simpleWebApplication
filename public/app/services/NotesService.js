angular.module('NotesService', []).factory('Notes', function($http, $rootScope, $location,$q) {

    return {

        getNotes: function(userId) {
            var deffered = $q.defer();
            $http.get('/notes/'+ userId).success(function(data) {
                    deffered.resolve(data);
            });
            return deffered.promise;
        },
        
        addNotes: function(notedData) {
            var deffered = $q.defer();
            $http.post('/addNotes',notedData).success(function(data) {
                deffered.resolve(data);
            });
            return deffered.promise;
        } ,

        deleteNotes: function(notedData) {
            var deffered = $q.defer();
            $http.post('/deleteNotes',notedData).success(function(data) {
                deffered.resolve(data);
            });
            return deffered.promise;
        }

    }

});