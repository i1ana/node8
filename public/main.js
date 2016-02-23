
angular.module('JobApp', [])

// angular.module('JobApp')
// 	.controller('homeController', ['$scope', function($scope){
// 		$scope.applicants = []
// 	}]);

angular.module('JobApp')
	.controller('applicantController', ['$scope', '$http', function($scope, $http){
	
		$http.get('api/applicants').then(function(data){
			console.log(data)
			$scope.applicant = data.data;
		})		
	
	}]);

