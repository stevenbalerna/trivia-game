$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 15,
    timerOn: false,
    timerId : '',
// questions options and answers info
questions: {
    q1: 'Who has the most MVP awards in NBA History?', 
    q2: 'Which player has scored 80 points or more in a single game?',
    q3: 'Which team has the most championships in NBA History?',
    q4: 'Which coach has the most regular season wins in NBA History?',
    q5: 'Who is the only rookie to win NBA Finals MVP?',
},

options: {
    q1: ['Michael Jordan', 'Magic Johnson', 'Kareem Abdul-Jabbar', 'Lebron James',],
    q2: ['Kobe Bryant', 'Michael Jordan', 'Larry Bird', 'Allen Iverson',],
    q3: ['Chicago Bulls', 'Boston Celtics', 'Los Angeles Lakers', 'Golden State Warriors',],
    q4: ['Phil Jackson', 'Pat Riley','Greg Popovich', 'Don Nelson'],
    q5: ['Wilt Chamberlin', 'Tim Duncan', 'Magic Johnson', 'Michael Jordan'],
},

answers: {
    q1: 'Kareem Abdul-Jabbar',
    q2: 'Kobe Bryant',
    q3: 'Boston Celtics',
    q4: 'Don Nelson',
    q5: 'Magic Johnson',
},

// trivia methods
// method to initialize game
startGame: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game section
    $('#quiz').show();

    // clear last results
    $('#results').html('');

    // timer display
    $('#timer').text(trivia.timer);

    // clear start button
    $('#start').hide();

    $('#remaining-time').show();

    // first question asked code here
    trivia.nextQuestion();
},

/// method to loop through and display questions and options
nextQuestion : function(){

    // this will set timer to 15 seconds each question
    trivia.timer = 15;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // this will stop timer from speeding up
    if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);   
    }
// gathers all questions and indexes all current questions
var questionContent = Object.values(trivia.questions)[trivia.currentSet];
$('#question').text(questionContent);

// this will pull the array of all user options for respective questions
var questionOptions = Object.values(trivia.options)[trivia.currentSet];

// generates all the trivia guess choices in the html
$.each(questionOptions, function(index, key){
$('#options').append($('<button class="option btn btn-primary btn-lg">'+key+'</button>'));
})
},
// method that will decrement counter and count unanswered due to timer running out of time
timerRunning : function(){
// if timer still has time and there are still questions that need to be answered
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
        if(trivia.timer === 4){
           $('timer').addClass('last-seconds'); 
        }
    }
// time runs out and question unanswered, run result
    else if (trivia.timer === - 1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
// code to end game once all question have been answered
else if(trivia.currentSet === Object.keys(trivia.questions).length){

// this will total all the results of the game (right, wrong, unanswered)
$('#results')
.html('<h3>Thanks for playing NBA Trivia!</h3>'+
'<p>Correct: '+ trivia.correct +'</p>'+
'<p>Incorrect: '+ trivia.incorrect +'</p>'+
'<p>Unaswered: '+ trivia.unanswered +'</p>'+
'<p>Please play again!</p>');

// hide game sction
$('#quiz').hide();
      
// show start button to begin a new game
$('#start').show();
}

},

// this method will evaluate the option that was clicked
guessChecker : function() {
// timer ID for gameResult setTimeout
var resultId;
    
// the answer to the current question being asked
var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

// if the text of the option picked matches the answer of the current question, increment correct
if($(this).text() === currentAnswer){
  // turn button green for correct
  $(this).addClass('btn-success').removeClass('btn-info');
  
  trivia.correct++;
  clearInterval(trivia.timerId);
  resultId = setTimeout(trivia.guessResult, 1000);
  $('#results').html('<h3>Correct Answer!</h3>');
}
 // else the user picked the wrong option, increment incorrect
 else{
    // turn button clicked red for incorrect
    $(this).addClass('btn-danger').removeClass('btn-info');
    
    trivia.incorrect++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Better luck next time! The answer is '+ currentAnswer +'</h3>');
  }
  
},
// method to remove previous question results and options
guessResult : function(){
  
  // increment to next question set
  trivia.currentSet++;
  
  // remove the options and results
  $('.option').remove();
  $('#results h3').remove();
  
  // begin next question
  trivia.nextQuestion();
   
}


}