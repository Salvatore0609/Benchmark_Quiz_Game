/*  
SE true && clicco(event) --> appare procedi = aggiungi percentuale (a pagina collegata), 
ALTRIMENTI SE false && clicco(event) --> appare procedi = aggiungi percentuale errore. 
*/

let answer = document.querySelectorAll(".answer");
let footer = document.querySelector("footer");
let timer;
//
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// Controllo per evitare errori nella pagina 3
if (document.querySelector("#questionTitle")) {
  random(questions);
  startTimer();
}

// Funzione per visualizzare domande random
function random(questionsArray) {
  let h2 = document.querySelector("#questionTitle");
  let main = document.querySelector("main");
  const random = Math.floor(Math.random() * questionsArray.length);

  let question = questionsArray[random].question;
  h2.textContent = question;

  let correctAnswer = questionsArray[random].correct_answer;
  let incorrectAnswer = questionsArray[random].incorrect_answers;
  let totAnswer = [...incorrectAnswer, correctAnswer];

  for (let i = 0; i < answer.length; i++) {
    let p = document.createElement("p");
    p.textContent = totAnswer[i];
    answer[i].innerHTML = "";
    answer[i].appendChild(p);
    main.appendChild(answer[i]);
  }
}

// Gestione del bottone "Procedi"
for (let i = 0; i < answer.length; i++) {
  answer[i].addEventListener("click", () => {
    if (!footer.querySelector(".btnProceed")) {
      let proceedBtn = document.createElement("button");
      proceedBtn.textContent = "Procedi";
      proceedBtn.classList.add("btnProceed");
      footer.appendChild(proceedBtn);

      proceedBtn.addEventListener("click", () => {
        for (let i = 0; i < answer.length; i++) {
          answer[i].textContent = "";
        }
        changeQuestionNumber();
        proceedBtn.remove();
      });
    }
  });
}

// Funzione per aggiornare il numero della domanda
function changeQuestionNumber() {
  let questionNumber = document.querySelector("#questionNumber");
  let number = parseInt(questionNumber.textContent);
  number++;
  questionNumber.textContent = number;

  if (number === 10) {
    window.location.href = "../pg3/result.html";
  } else {
    random(questions);
    resetTimer();
  }
}

// Timer con effetto countdown
let totalTime = 10;
let currentTime = totalTime;
let timeElement = document.querySelector("#timer");
let circleElement = document.querySelector(".circle");

function updateTimer() {
  if (currentTime >= 0) {
    timeElement.textContent = currentTime;
    const angle = (currentTime / totalTime) * 360;
    circleElement.style.background = `conic-gradient(#00ffff ${angle}deg,rgba(255, 255, 255, 0.68) ${angle}deg)`;
    currentTime--;
  } else {
    changePage();
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(timer);
  currentTime = totalTime;
  startTimer();
}

// Passaggio automatico alla domanda successiva alla scadenza del timer
function changePage() {
  changeQuestionNumber();
  resetTimer();
}


//pagina 3



/* let answerWrogn = [...incorrectAnswer];
console.log(incorrectAnswer) */


for(let i = 0 ; i <= questions.length; i++){
  let element = questions[i].correct_answer;
  console.log(element)
}

/* function controlQuestion() {
  
} */