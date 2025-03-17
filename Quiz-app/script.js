// import quizData from './data'

//  use this quizData in your app.
const quizData = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
},
// you can add more quiz here
]

let i=0;
let correctAnswer=0;

document.addEventListener("DOMContentLoaded", ()=>{
    landing()
});

function landing(){
    document.querySelector('body').innerHTML = "";

    const titleDiv = document.createElement('div');
    titleDiv.id = "titleDiv";

    const title = document.createElement('h1');
    title.id = "title";
    title.innerText = "Quiz App";

    titleDiv.appendChild(title);

    document.querySelector('body').appendChild(titleDiv);
    
    const containerDiv = document.createElement('div');
    containerDiv.className = "containerStart";

  




    const resultDiv = document.createElement('div');
    resultDiv.id = "resultDiv";

    const result = document.createElement('h2');
    result.id = "result";
    result.innerText = `Click on the button to start the quiz.`

    resultDiv.appendChild(result);

    const reAttemptDiv = document.createElement('div');
    reAttemptDiv.id = "reAttemptDiv";

    const startButton = document.createElement('button');
    startButton.id = "startButton"
    startButton.innerText = "Start quiz"
    startButton.addEventListener("click",startQuiz);

    reAttemptDiv.appendChild(startButton);

    containerDiv.appendChild(resultDiv)
    containerDiv.appendChild(reAttemptDiv)


    document.querySelector('body').appendChild(containerDiv);
}
    

    const resultDiv = document.createElement('div');
    resultDiv.id = "resultDiv";

    const result = document.createElement('h2');
    result.id = "result";
    result.innerText = `You answered ${correctAnswer}/${quizData.length} questions correctly.`

    resultDiv.appendChild(result);

    const reAttemptDiv = document.createElement('div');
    reAttemptDiv.id = "reAttemptDiv";

    const reAttemptButton = document.createElement('button');
    reAttemptButton.id = "reAttemptButton"
    reAttemptButton.innerText = "Re-attempt"
    reAttemptButton.addEventListener("click",reAttempt);

    reAttemptDiv.appendChild(reAttemptButton);

    containerDiv.appendChild(resultDiv)
    containerDiv.appendChild(reAttemptDiv)


    document.querySelector('body').appendChild(containerDiv);






function startQuiz(){
    document.querySelector('body').innerHTML = "";

    const titleDiv = document.createElement('div');
    titleDiv.id = "titleDiv";

    const title = document.createElement('h1');
    title.id = "title";
    title.innerText = "Quiz  App";

    titleDiv.appendChild(title);

    document.querySelector('body').appendChild(titleDiv);

    const containerDiv = document.createElement('div');
    containerDiv.className = "container";

    const questionDiv = document.createElement('div');
    questionDiv.id = "questionDiv";

    const question = document.createElement('h2');
    question.id = "question";

    questionDiv.appendChild(question)


    const form = document.createElement('form');
    form.id = "myForm"

    form.style.display = "block"

    const questionOptionDiv = document.createElement('div');
    questionOptionDiv.id="questionOptionDiv"

    const optionDiv = document.createElement('div');
    optionDiv.id = "optionDiv";

    const labelA = document.createElement('label');
    const labelB = document.createElement('label');
    const labelC = document.createElement('label');
    const labelD = document.createElement('label');

    labelA.className = "label"
    labelB.className = "label"
    labelC.className = "label"
    labelD.className = "label"

    const optionA = document.createElement('input');
    optionA.setAttribute('value','a');
    optionA.setAttribute('id','a');
    optionA.setAttribute('type','radio');
    optionA.setAttribute('name','options');

    const spanA = document.createElement('span');
    spanA.setAttribute('id','a-text');
    
    labelA.setAttribute('for','a')
    


    const optionB = document.createElement('input');
    optionB.setAttribute('value','b');
    optionB.setAttribute('id','b');
    optionB.setAttribute('type','radio');
    optionB.setAttribute('name','options');

    const spanB = document.createElement('span');
    spanB.setAttribute('id','b-text');

    labelB.setAttribute('for','b')

    

    const optionC = document.createElement('input');
    optionC.setAttribute('value','c');
    optionC.setAttribute('id','c');
    optionC.setAttribute('type','radio');
    optionC.setAttribute('name','options');

    const spanC = document.createElement('span');
    spanC.setAttribute('id','c-text');

    labelC.setAttribute('for','c')

    

    const optionD = document.createElement('input');
    optionD.setAttribute('value','d');
    optionD.setAttribute('id','d');
    optionD.setAttribute('type','radio');
    optionD.setAttribute('name','options');

    const spanD = document.createElement('span');
    spanD.setAttribute('id','d-text');
    
    labelD.setAttribute('for','d')
    

    labelA.appendChild(optionA)
    labelA.appendChild(spanA)

    labelB.appendChild(optionB)
    labelB.appendChild(spanB)

    labelC.appendChild(optionC)
    labelC.appendChild(spanC)

    labelD.appendChild(optionD)
    labelD.appendChild(spanD)

    optionDiv.appendChild(labelA);
    optionDiv.appendChild(labelB);
    optionDiv.appendChild(labelC);
    optionDiv.appendChild(labelD);

    questionOptionDiv.appendChild(questionDiv);
    questionOptionDiv.appendChild(optionDiv);

    form.appendChild(questionOptionDiv)

    const submitButton = document.createElement('button');
    submitButton.id = "submit";
    submitButton.type = "button";
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click",submitQuiz);

    containerDiv.appendChild(form);

    const submitDiv = document.createElement('div');
    submitDiv.id="submitDiv";
    submitDiv.appendChild(submitButton);

    containerDiv.appendChild(submitDiv);

    document.querySelector('body').appendChild(containerDiv);

    loadQuestion();

}

function loadQuestion(){

    if(i<quizData.length){
        document.getElementById('question').innerText = quizData[i].question;
        document.getElementById('a-text').innerText = quizData[i].a;
        document.getElementById('b-text').innerText = quizData[i].b;
        document.getElementById('c-text').innerText = quizData[i].c;
        document.getElementById('d-text').innerText = quizData[i].d;

        const radioButtons = document.getElementsByName('options'); radioButtons.forEach(radio => radio.checked = false);
    }
    else{
        showResult();
    }
    
}

function submitQuiz(){
        const form = document.getElementById('myForm');
        const selected = form.elements['options'].value;

        if(selected == quizData[i].correct){
            correctAnswer++;
        }
        i++;

        loadQuestion();
    
}

function showResult(){

    document.querySelector('body').innerHTML = "";

    const titleDiv = document.createElement('div');
    titleDiv.id = "titleDiv";

    const title = document.createElement('h1');
    title.id = "title";
    title.innerText = "Quiz App";

    titleDiv.appendChild(title);

    document.querySelector('body').appendChild(titleDiv);
    
    const containerDiv = document.createElement('div');
    containerDiv.className = "containerEnd";

    const resultDiv = document.createElement('div');
    resultDiv.id = "resultDiv";

    const result = document.createElement('h2');
    result.id = "result";
    result.innerText = `You answered ${correctAnswer}/${quizData.length} questions correctly.`

    resultDiv.appendChild(result);

    const reAttemptDiv = document.createElement('div');
    reAttemptDiv.id = "reAttemptDiv";

    const reAttemptButton = document.createElement('button');
    reAttemptButton.id = "reAttemptButton"
    reAttemptButton.innerText = "Re-attempt"
    reAttemptButton.addEventListener("click",reAttempt);

    reAttemptDiv.appendChild(reAttemptButton);

    containerDiv.appendChild(resultDiv)
    containerDiv.appendChild(reAttemptDiv)


    document.querySelector('body').appendChild(containerDiv);
}

function reAttempt(){
    i=0;
    landing();
}