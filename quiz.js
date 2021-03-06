(function() {
    var questions = [{
        question: "Which year did the franchise take on the name 'Yankees'?",
        choices: [1901, 1905, 1913, 1915],
        correctAnswer: 2
    }, {
        question: "When did the Yankees win their first World Series?",
        choices: [1913, 1916, 1919, 1923],
        correctAnswer: 3
    }, {
        question: "What manager led the Yankees to the World Series title in 2000?",
        choices: ["Joe Torre", "Yogi Berra", "Bobby Valentine", "Derek Jeter"],
        correctAnswer: 0
    }, {
        question: "Which Yankee was known as the 'Iron Horse'?",
        choices: ["Mickey Mantle", "Babe Ruth", "Joe DiMaggio", "Lou Gehrig"],
        correctAnswer: 3
    }, {
        question: "When was Babe Ruth sold to the Yankees??",
        choices: [1916, 1918, 1919, 1920],
        correctAnswer: 3

    }, {
        question: "What famous Yankee died when he was only 37?",
        choices: ["Mickey Mantle", "Babe Ruth", "Joe DiMaggio", "Lou Gehrig"],
        correctAnswer: 3

    }, {
        question: "Who is not a member of the 'Core Four'?",
        choices: ["Derek Jeter" , "Babe Ruth", "Jorge Posada", "Andy Pettite"],
        correctAnswer: 1
    }, {
        question: "What year did the Yankees play the Mets in the 'Subway Series?",
        choices: [2003 , 2002, 2001, 2000],
        correctAnswer: 3
    }, {
        question: "In what borough is Yankee Stadium located?",
        choices: ["Manhatten" , "Brooklyn", "Bronx", "Queens"],
        correctAnswer: 2
    }, {
        question: "In what year did Derek Jeter retire?",
        choices: [2003 , 2009, 2014, 2013],
        correctAnswer: 2





    }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function(e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>', { id: 'question' });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();
