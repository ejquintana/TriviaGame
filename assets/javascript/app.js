var triviaArray = [{
  triviaQuestion: "Name the cannibals feared by all in Serenity",
  ansArray: ["Ravagers", "Reavers", "Berserkers", "Zipper Heads"],
  answer: 1
},{
  triviaQuestion: "Who was the first Dr. Who?",
  ansArray: ["William Hartnell", "Patrick Troughton", "Tom Baker", "Jon Pertwee"],
  answer: 0
},{
  triviaQuestion: "What was the name of the arch villain in Mad Max 2: The Road Warrior",
  ansArray: ["Immortan Joe", "Lord Humungus", "Bubba Zanetti", "Nightrider"],
  answer: 1
},{
  triviaQuestion: "Who did the boys find and hide in Stranger Things?",
  ansArray: ["Joe Ratzcliffe", "Robbie", "Eleven", "Nina"],
  answer: 2
},{
  triviaQuestion: "Name the murderous computer in the Kubrick classic 2001?",
  ansArray: ["HAr5000", "AstroCon20", "Computer", "Hal"],
  answer: 3
},{
  triviaQuestion: "What was the magic word that triggered River Tam in Serenity?",
  ansArray: ["Miranda", "Reaver", "Jarome", "Bleeder"],
  answer: 0
},{
  triviaQuestion: "Who ran off with the villain's wives in Mad Max Fury Road?",
  ansArray: ["Nux", "Imperator Furiosa", "The Dag", "Rictus Erectus"],
  answer: 1
},{
  triviaQuestion: "Who controlled the water in Mad Max Fury Road?",
  ansArray: ["The People Eater", "The Bullet Farmer", "Immortan Joe", "The Doof"],
  answer: 2
},{
  triviaQuestion: "What was the detective investigating in the Expanse?",
  ansArray: ["Star Helix corruption", "Julie Mao's disappearance", "Sutton's drinking problem", "Kenzo's data cache"],
  answer: 1
},{
  triviaQuestion: "In Battlestar Galactica, how many skinjob models were there?",
  ansArray: ["5", "9", "3", "12"],
  answer: 3
}];

var imgArray = ['reaver', 'drwho', 'lordh', 'eleven', 'hal', 'miranda', 'imperatorf','imjoe', 'juliem', 'bstarg'];
var questionNum; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered;
var userSelect;
var responseToUsr = {
  correct: "Yes, way to go!",
  incorrect: "You are WRONG-tastic!",
  endTime: "Out of time!",
  finished: "GAME OVER!"
}

$('#startBtn').on('click', function(){
  $(this).hide();
  newGame();
});

$('#startOverBtn').on('click', function(){
  $(this).hide();
  newGame();
});

function newGame(){
  $('#gameOver').empty();
  $('#numRightAnswers').empty();
  $('#numWrongAnswers').empty();
  $('#numUnanswered').empty();
  questionNum = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion(){
  $('#userMessage').empty();
  $('#answerToQuestion').empty();
  $('#gify').empty();
  answered = true;
  
  //sets up new questions & ansArray
  $('#questionNumber').html('Question #'+(questionNum+1)+'/'+triviaArray.length);
  $('.triviaQuestion').html('<h2>' + triviaArray[questionNum].triviaQuestion + '</h2>');
  for(var i = 0; i < 4; i++){
    var choices = $('<div>');
    choices.text(triviaArray[questionNum].ansArray[i]);
    choices.attr({'data-index': i });
    choices.addClass('thisChoice');
    $('.ansArray').append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $('.thisChoice').on('click',function(){
    userSelect = $(this).data('index');
    clearInterval(time);
    answerPage();
  });
}

function countdown(){
  seconds = 15;
  $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown(){
  seconds--;
  $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
  if(seconds < 1){
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage(){
  $('#questionNumber').empty();
  $('.thisChoice').empty(); //Clears question page
  $('.triviaQuestion').empty();

  var rightAnswerText = triviaArray[questionNum].ansArray[triviaArray[questionNum].answer];
  var rightAnswerIndex = triviaArray[questionNum].answer;
  $('#gify').html('<img src = "assets/images/'+ imgArray[questionNum] +'.gif" width = "400px">');
  //checks to see correct, incorrect, or unanswered
  if((userSelect == rightAnswerIndex) && (answered == true)){
    correctAnswer++;
    $('#userMessage').html(responseToUsr.correct);
  } else if((userSelect != rightAnswerIndex) && (answered == true)){
    incorrectAnswer++;
    $('#userMessage').html(responseToUsr.incorrect);
    $('#answerToQuestion').html('The correct answer was: ' + rightAnswerText);
     $('#gify').html('<img src = "assets/images/wrong.gif'+ '" width = "400px">');
  } else{
    unanswered++;
    $('#userMessage').html(responseToUsr.endTime);
    $('#answerToQuestion').html('The correct answer was: ' + rightAnswerText);
    answered = true;
  }
  
  if(questionNum == (triviaArray.length-1)){
    setTimeout(scoreboard, 5000)
  } else{
    questionNum++;
    setTimeout(newQuestion, 5000);
  } 
}

function scoreboard(){
  $('#timer').empty();
  $('#userMessage').empty();
  $('#answerToQuestion').empty();
  $('#gify').empty();

  $('#gameOver').html(responseToUsr.finished);
  $('#numRightAnswers').html("Correct Answers: " + correctAnswer);
  $('#numWrongAnswers').html("Incorrect Answers: " + incorrectAnswer);
  $('#numUnanswered').html("Unanswered: " + unanswered);
  $('#startOverBtn').addClass('reset');
  $('#startOverBtn').show();
  $('#startOverBtn').html('Try Again?');
}