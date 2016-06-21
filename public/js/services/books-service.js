angular.module('geospatial')


.service('Books', function(){
    this.tempBooks = [] ;
    this.returnBooks= function(){
      var book1 = {
        name: 'book1',
        author: 'author1',
        category: 'horror',
        date: '',
        status: false
      };

      var book2 = {
        name: 'book2',
        author: 'author2',
        category: 'action',
        date: '',
        status: false
      };

      var book3 = {
        name: 'book3',
        author: 'author3',
        category: 'fiction',
        date: '',
        status: false
      };

      var Books =  [ book1, book2, book3 ];

      return Books;
    };

})
