var myApp = angular.module('myApp')
.controller("menu", function($scope, MyService,$state){
  $('#your-modal-id').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  $scope.table = function(num){

    MyService.update(num)
    $state.go('countdown')
  }
})

.controller("countdown",function($scope, MyService,$interval,$state){  
  $scope.countDown = 5;    
  var timer = $interval(function(){
    $scope.countDown--;
    if($scope.countDown === 0) { 
      $interval.cancel(timer);
      $state.go('testPage');
    }
  }, 1000);
})

.controller('test', function($scope, MyService, questionGenerator,$interval,$state){
  var currentQuestion = questionGenerator.serveQuestion();
  var forFurtherPractise = [];
  $scope.mistakes = 0;
  $scope.arrayOfQuestionsAsked = [];
  console.log('hi')
  $scope.counter=00;
  $scope.minutes=0;
  var timer = $interval(function(){
    if($scope.counter < 59){
      $scope.counter++
    }else{
      $scope.counter = 0;
      $scope.minutes++;
    }
  }, 1000);

  $scope.table = MyService.data.num;
  $scope.submitAnswer = function(event){
    if(event.keyCode === 13){
      handleAnswer($scope.answer)
      $scope.answer = '';
    }
  }

  showQuestion();
  function showQuestion(){
    $scope.currentNum = currentQuestion[0].rand;
    $scope.table = currentQuestion[0].table;
    responsiveVoice.speak( $scope.table + ' times ' + $scope.currentNum);
  }

  function handleAnswer(answer){
    currentQuestion[0].attempt = answer;
    if(answer == currentQuestion[0].answer()){ 
      responsiveVoice.speak( 'Correct!');
    }else{
      currentQuestion.push(currentQuestion[0]);
      forFurtherPractise.push(currentQuestion[0]);
      console.log(currentQuestion[0]);
      console.log(forFurtherPractise);
      $scope.mistakes ++;
      responsiveVoice.speak("Wrong!!")
    }
    $scope.arrayOfQuestionsAsked.push(currentQuestion.shift());
    if(currentQuestion[0]){
      showQuestion(); 
    }else{
      $interval.cancel(timer);
      if(!$scope.mistakes) $scope.mistakes = 'no';
      if($scope.mistakes != 1) 
      console.log('You made '+ $scope.mistakes + ' mistakes and finished in ' + $scope.minutes + ':'+$scope.counter);
      responsiveVoice.speak('You made '+ $scope.mistakes + ' mistakes and finished in ' + $scope.minutes + ' minutes and '+$scope.counter+' seconds');
      $('#myModal').modal();
      $scope.restart = function(){
        $state.go('home')
      }
  
    }
  }
})