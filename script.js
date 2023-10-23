const questions = [
    {
        question: "Which of the following is the smallest in terms of land area?",
        answers: [
            { text:"Madagascar", correct:false},
            { text:"Vatican City", correct:true},
            { text:"Liechtenstein", correct:false},
            { text:"Monaco", correct:false},

        ]
    },
    {
        question: "What is the northernmost capital city in the world?",
        answers: [
            { text:"Helsinki", correct:false},
            { text:"Oslo", correct:false},
            { text:"Tokyo", correct:false},
            { text:"Reykjavik", correct:true},

        ] 
    },
    {
        question: "The Great Barrier Reef is located off the coast of which country?",
        answers: [
            { text:"USA", correct:false},
            { text:"Indonesia", correct:false},
            { text:"Australia", correct:true},
            { text:"South Africa", correct:false},

        ] 
    },
    {
        question: "Which African country is known as the 'Land of a Thousand Hills'?",
        answers: [
            { text:"Rwanda", correct:true},
            { text:"Kenya", correct:false},
            { text:"Zimbabwe", correct:false},
            { text:"Tanzania", correct:false},

        ] 
    },
    {
        question: "What is the name of the strait that separates Spain from Morocco?",
        answers: [
            { text:"Palk Strait", correct:false},
            { text:"Cook Strait", correct:false},
            { text:"Strait of Gibraltar", correct:true},
            { text:"Strait of Malacca", correct:false},

        ] 
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();

