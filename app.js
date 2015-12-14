var myApp = angular.module("myApp", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home',{
    url:'/',
    templateUrl: './home.html',
    controller: 'menu'
  })

   .state('countdown',{
    url:'/ready',
    templateUrl: './countdown.html',
    controller: 'countdown'
  })

  .state('testPage',{
    url:'/testPage',
    templateUrl: './testPage.html',
    controller: 'test'
  })
})

.factory('MyService', function(){
  return {
    data: {
      num:''
    },
    update: function(num) {
      this.data.num = num;  
    }
  };
})

.service('questionGenerator', function(MyService){
  this.serveQuestion = function(){
    var questionArray = [];
    for (var i = 0; i <=10; i++){
      var randomNum = Math.floor(Math.random()*11+1)+1;
      questionArray.push({
        table:MyService.data.num, 
        rand: randomNum, 
        answer: function(){
          return this.table * this.rand;
        }
      })
    }
    return questionArray;  
  }
})

.directive('timer', function(){
  return {
    templateUrl: "./timer.html"
  }
})

.filter('leadZero',function(){
  return function(input){
    if(input<10){
      input = "0" + input;
    }
    return input;
  }
})


