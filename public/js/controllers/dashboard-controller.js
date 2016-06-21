angular.module('geospatial')
	.controller('DashboardController', ['$scope' , '$location', 'Books', function($scope, $location, Books) {

		$scope.book = {
      name : "",
      author : "",
      category : "",
      date : "" ,
      status : ""
    };

    $scope.user = {
      name : ""
    }

    $scope.books = [];

		$scope.initBooks = function() {
			console.log(Books.tempBooks);
			$scope.books = Books.tempBooks;
			console.log($scope.books);
		};

		$scope.listOfBooks = function() {
			console.log(Books.returnBooks());
			$scope.books = Books.returnBooks();
			Books.tempBooks = $scope.books;
			$location.path('/query');
    };

    $scope.listFilters = function() {
			Books.tempBooks = [];
			console.log($scope.books.length);
			var temp = [];
			for(var i=0; i < $scope.books.length ;i ++) {
				//$scope.books
				if($scope.book.name == $scope.books[i].name ) {
					temp.push($scope.books[i].name);
				}
			}
			Books.tempBooks = temp;
			$location.path('/query');
    };

    $scope.createBook = function() {
			Books.tempBooks = [];
			console.log($scope.books.length);
			var temp = [];
			for(var i=0; i < $scope.books.length ;i ++) {
				//$scope.books
				if($scope.book.name == $scope.books[i].name ) {
					temp.push($scope.books[i].name);
				}
			}
			Books.tempBooks = temp;
			$location.path('/query');

    };

    $scope.selectBook = function(name) {
			Books.tempBooks = [];
			console.log($scope.books.length);
			var temp = [];
			for(var i=0; i < $scope.books.length ;i ++) {
				//$scope.books
				if($scope.book.name == $scope.books[i].name ) {
					temp.push($scope.books[i].name);
				}
			}
			Books.tempBooks = temp;
			$location.path('/query');

    };

    $scope.deletBook = function(name) {
			Books.tempBooks = [];
			console.log($scope.books.length);
			var temp = [];
			for(var i=0; i < $scope.books.length ;i ++) {
				//$scope.books
				if($scope.book.name == $scope.books[i].name ) {
					temp.pop($scope.books[i].name);
				}
			}
			Books.tempBooks = temp;
			$location.path('/query');
    };


	}]);
