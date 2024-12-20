let answer = document.querySelectorAll(".answer");
let footer = document.querySelector("footer");
let timer;
let userScore = 0; 
let totalAnswers = 0; 
let selectedAnswer = "";

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

    // Riabilita i pulsanti per ogni nuova domanda
    answer[i].disabled = false;
  }
}


// Gestione delle risposte e del bottone "Procedi"
for (let i = 0; i < answer.length; i++) {
  answer[i].addEventListener("click", (event) => {
    const questionNumber = parseInt(document.querySelector("#questionNumber").textContent);

    // Disabilita i pulsanti alla decima domanda
    if (questionNumber > questions.length) {
      for (let j = 0; j < answer.length; j++) {
        answer[j].disabled = true;
      }
      return; // Esci dall'evento click
    }

    selectedAnswer = event.target.textContent;

    if (!footer.querySelector(".btnProceed")) {
      let proceedBtn = document.createElement("button");
      proceedBtn.textContent = "Procedi";
      proceedBtn.classList.add("btnProceed");
      footer.appendChild(proceedBtn);

      proceedBtn.addEventListener("click", () => {
        checkAnswer();
        updatePercentage();
        changeQuestionNumber();
        proceedBtn.remove();
      });
    }
  });
}


// Funzione per verificare la risposta
function checkAnswer() {
  const currentQuestion = document.querySelector("#questionTitle").textContent;
  const correctAnswer = questions.find(q => q.question === currentQuestion).correct_answer;

  totalAnswers++; 
  if (selectedAnswer === correctAnswer) {
    userScore++;
  }
  console.log(`Punteggio: ${userScore} / ${totalAnswers}`);
}

// Funzione per aggiornare le percentuali
function updatePercentage() {
  const successPercentage = ((userScore / totalAnswers) * 100).toFixed(2);
  const errorPercentage = (100 - successPercentage).toFixed(2);

  localStorage.setItem("successPercentage", successPercentage);
  localStorage.setItem("errorPercentage", errorPercentage);
  localStorage.setItem("correctAnswers", userScore); 
  localStorage.setItem("totalAnswers", totalAnswers);
}



function changeQuestionNumber() {
  let questionNumber = document.querySelector("#questionNumber");
  let number = parseInt(questionNumber.textContent);
  number++;

  if (number > questions.length) {
    // Disabilita i pulsanti delle risposte alla fine
    for (let i = 0; i < answer.length; i++) {
      answer[i].disabled = true;
    }

    // Crea il pulsante "See Result" se non esiste già
    if (!footer.querySelector(".btnSeeResult")) {
      let seeResult = document.createElement("button");
      seeResult.textContent = "See Result";
      seeResult.classList.add("btnSeeResult");
      footer.appendChild(seeResult);

      // Aggiungi un evento al pulsante "See Result"
      seeResult.addEventListener("click", () => {
        window.location.href = "../pg3/result.html";
      });

      // Rimuovi il pulsante "Procedi" se esiste
      let proceedBtn = document.querySelector(".btnProceed");
      if (proceedBtn) {
        proceedBtn.remove();
      }
    }
  } else {
    // Aggiorna il numero della domanda
    questionNumber.textContent = number;
    random(questions);
    resetTimer();
    selectedAnswer = "";
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
    handleTimeout(); 
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

// Funzione per gestire il timeout
function handleTimeout() {
  totalAnswers++; 
  updatePercentage(); 
  if (questionNumber >= questions.length) {
    // Reindirizza alla pagina dei risultati
    window.location.href = "../pg3/result.html";
  } else {
    // Altrimenti, procedi con la prossima domanda
    changeQuestionNumber();
  }
}



document.addEventListener("DOMContentLoaded", () => {
  
    const successPercentage = localStorage.getItem("successPercentage") || "0";
    const errorPercentage = localStorage.getItem("errorPercentage") || "0";
    const totalAnswers = parseInt(localStorage.getItem("totalAnswers")) || 0;
    const correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    const incorrectAnswers = totalAnswers - correctAnswers;
  
  
    const correctPercentageElement = document.querySelector(".boxResult:nth-child(1) h2:nth-of-type(2)");
    const correctCountElement = document.querySelector(".boxResult:nth-child(1) p");
    const wrongPercentageElement = document.querySelector(".boxResult:nth-child(3) h2:nth-of-type(2)");
    const wrongCountElement = document.querySelector(".boxResult:nth-child(3) p");
    const passMessageElement = document.querySelector(".azzuro");
    const sorryMessageElement = document.querySelector(".chartCenterContent p");
  
  
    if (correctPercentageElement && correctCountElement && wrongPercentageElement && wrongCountElement && passMessageElement) {
      
      correctPercentageElement.textContent = `${successPercentage}%`;
      correctCountElement.textContent = `${correctAnswers}/${totalAnswers} questions`;
  
      wrongPercentageElement.textContent = `${errorPercentage}%`;
      wrongCountElement.textContent = `${incorrectAnswers}/${totalAnswers} questions`;
  
  
      if (parseFloat(successPercentage) >= 60) {
        passMessageElement.textContent = "You passed the exam ";
      } else {
        passMessageElement.textContent = "You did not pass the exam ";
        sorryMessageElement.textContent = "Sorry!";
      }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se siamo nella pagina dei risultati controllando il canvas
  const canvas = document.querySelector("#resultChart");

  if (canvas) {
    // Logica per il grafico Chart.js
    const successPercentage = localStorage.getItem("successPercentage") || "0";
    const errorPercentage = localStorage.getItem("errorPercentage") || "0";

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {

        datasets: [
          {

            data: [errorPercentage, successPercentage],
            backgroundColor: ["#D20094", "#00FFFF"], 
            borderWidth: 0,

          },
        ],
      },
      options: {
        cutout: "70%",
      },
    });

  } else {
    console.log("Grafico Chart.js non caricato: questa pagina non necessita del grafico.");
  }
});
