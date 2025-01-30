const question = [
    {
        question: 'What is the capital of France?',
        answers: [
            {text: 'New York', correct: false},
            {text: 'London', correct: false},
            {text: 'Paris', correct: true},
            {text: 'Dublin', correct: false}
        ]
    },
    {
        question: 'Who is CEO of Tesla?',
        answers: [
            {text: 'Jeff Bezos', correct: false},
            {text: 'Elon Musk', correct: true},
            {text: 'Bill Gates', correct: false},
            {text: 'Tony Stark', correct: false}
        ]
    },
    {
        question: 'The iPhone was created by which company?',
        answers: [
            {text: 'Apple', correct: true},
            {text: 'Intel', correct: false},
            {text: 'Amazon', correct: false},
            {text: 'Microsoft', correct: false}
        ]
    },
    {
        question: 'How many Harry Potter books are there?',
        answers: [
            {text: '1', correct: false},
            {text: '4', correct: false},
            {text: '6', correct: false},
            {text: '7', correct: true}
        ]
    }
]
const ques = document.getElementById("question");
const ans = document.getElementById("answer-btn");
const next = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    next.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    ques.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ans.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    next.style.display = "block";
}

next.addEventListener("click", () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        resetState();
        ques.innerHTML = "Your Score is " + score + " out of " + question.length;
        next.innerHTML = "Restart";
        next.style.display = "block";
        next.addEventListener("click", () => {
            if (currentQuestionIndex < question.length) {
                showQuestion();
            } else {
                startQuiz(); // Restart the quiz when the game ends
            }
        });
    }
});

startQuiz();